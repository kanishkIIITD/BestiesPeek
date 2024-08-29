// import { besties } from "../data/groupNames";
const axios = require("axios");
const qs = require("qs");
require("dotenv").config();
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 180 }); //3 minutes
// const cron = require("node-cron");
const Streamer = require("../models/Streamer");

async function fetchApiData(user_login) {
    let baseURL = "https://api.twitch.tv/helix/streams";

    const queryString = qs.stringify(
        {
            user_login: user_login,
        },
        {
            indices: false,
        }
    );
    // console.log("queryString:", queryString);

    const url = `${baseURL}?${queryString}`;

    try {
        const response = await axios.get(url, {
            headers: {
                "Client-ID": process.env.CLIENT_ID,
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        console.log("Request sent to Twitch API");
        return response.data;
    } catch (error) {
        console.log("Error while fetching:", error);
    }
}

async function checkLiveStatus(user_login) {
    // Step: 1
    // validations
    if (user_login.includes("") || user_login.length === 0)
        // return res.status(400).send({ message: "Streamer name is required" });
        return console.log("Streamer name is required");
    console.log("Step 1 passed");

    // Step: 2
    // check If data is in cache
    const cacheKey = user_login.join(",");
    // console.log("cacheKey:", cacheKey);

    // check if data is in cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        // return res.json(cachedData);
        // console.log("reached the cache");
        // console.log(cachedData);
        // return res.status(200).send({ data: cachedData });
        return console.log("reached the cache");
    }
    console.log("Step 2 passed");

    let result;

    // Step: 3
    try {
        // fetch data
        result = await fetchApiData(user_login);
        if (!result) throw new Error("No data found");

        // store the result in cache before sending the response
        cache.set(cacheKey, result);

        const currentTime = new Date();

        // update the database
        user_login.map(async (user) => {
            // console.log(result);
            const liveStream = result.data.find((s) => s.user_login === user);
            // console.log(liveStream);

            if (liveStream) {
                // const updateData = {
                //     user_name: liveStream.user_name,
                //     streamer_id: liveStream.user_id,
                //     // profile_image_url: liveStream.user_profile_image_url,
                //     channel_url: `https://twitch.tv/${liveStream.user_login}`,
                //     is_live: !!liveStream,
                //     last_live_update: liveStream.started_at,
                //     // description: liveStream.user_description,
                //     stream_info: liveStream
                //         ? {
                //               stream_title: liveStream.title,
                //               viewer_count: liveStream.viewer_count,
                //               thumbnail_url: liveStream.thumbnail_url,
                //               game_name: liveStream.game_name,
                //           }
                //         : null,
                //     last_updated: currentTime,
                //     language: liveStream.language,
                // };
                // // console.log(updateData);

                // await Streamer.findOneAndUpdate(
                //     { streamer_id: liveStream.user_id },
                //     updateData,
                //     { upsert: true }
                // );

                // Streamer is live: Add or update entry in the database
                await Streamer.updateOne(
                    { streamer_id: liveStream.user_id }, // Match by unique ID
                    {
                        $set: {
                            user_name: liveStream.user_name,
                            streamer_id: liveStream.user_id,
                            profile_image_url: liveStream.profile_image_url,
                            channel_url: `https://www.twitch.tv/${liveStream.user_name}`,
                            is_live: true,
                            last_live_update: liveStream.started_at,
                            description: liveStream.description || "", // Assuming you may need this from another API
                            stream_info: {
                                stream_title: liveStream.title,
                                viewer_count: liveStream.viewer_count,
                                thumbnail_url: liveStream.thumbnail_url,
                                game_name: liveStream.game_name,
                            },
                            last_updated: currentTime,
                            language: liveStream.language,
                            user_login: liveStream.user_login,
                        },
                    },
                    { upsert: true } // This will insert a new document if one doesn't already exist
                );
            } else {
                // Streamer is offline: Update their `is_live` status to false
                await Streamer.updateOne(
                    // This below line converts the case sensitive comparing to case insensitive
                    { user_name: { $regex: `^${user}$`, $options: "i" } },
                    {
                        $set: {
                            is_live: false,
                            stream_info: null, // Clear stream info since they're offline
                            last_updated: currentTime,
                        },
                    }
                );
            }
        });

        console.log("Step 3 passed");

        // await Streamer.updateMany(
        //     {
        //         user_name: { $in: user_login },
        //         last_updated: { $lt: currentTime },
        //     },
        //     { $set: { is_live: false, stream_info: null } }
        // );

        // console.log("Step 4 passed");

        // await Streamer.find({
        //     user_name: { $in: user_login },
        // });

        // res.status(200).send({
        //     data: result,
        // });
    } catch (error) {
        console.log(error);
        // res.status(500).send({
        //     message: "Failed to fetch live streams",
        //     error: error.message,
        // });
    }
}

module.exports = { checkLiveStatus };
