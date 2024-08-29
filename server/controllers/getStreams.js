const axios = require("axios");
const qs = require("qs");
require("dotenv").config();
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 120 }); //120 seconds

const Streamer = require("../models/Streamer");
// const LiveStatus = require("../models/LiveStatus");

// async function fetchApiData(user_login) {
//     let baseURL = "https://api.twitch.tv/helix/streams";

//     const queryString = qs.stringify(
//         {
//             user_login: user_login,
//         },
//         {
//             indices: false,
//         }
//     );
//     // console.log("queryString:", queryString);

//     const url = `${baseURL}?${queryString}`;

//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 "Client-ID": process.env.CLIENT_ID,
//                 Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//             },
//         });
//         console.log("Request sent to Twitch API");
//         return response.data;
//     } catch (error) {
//         console.log("Error while fetching:", error);
//     }
// }

// exports.getStreamerData = async (req, res) => {
//     const user_login = req.body;

//     // Step: 1
//     // validations
//     if (user_login.includes("") || user_login.length === 0)
//         return res.status(400).send({ message: "Streamer name is required" });
//     console.log("Step 1 passed");

//     // Step: 2
//     // check If data is in cache
//     // can caching be done somewhere else ?
//     const cacheKey = user_login.join(",");

//     // check if data is in cache
//     const cachedData = cache.get(cacheKey);
//     if (cachedData) {
//         return res.status(200).send({ data: cachedData });
//     }
//     console.log("Step 2 passed");

//     let result;

//     // Step: 3
//     try {
//         // fetch data
//         result = await fetchApiData(user_login);
//         if (!result) throw new Error("No data found");

//         // store the result in cache before sending the response
//         cache.set(cacheKey, result);

//         const currentTime = new Date();

//         // update the database
//         user_login.map(async (user) => {
//             const liveStream = result.data.find((s) => s.user_login === user);

//             if (liveStream) {
//                 // Streamer is live: Add or update entry in the database
//                 await Streamer.updateOne(
//                     { streamer_id: liveStream.user_id }, // Match by unique ID
//                     {
//                         $set: {
//                             user_name: liveStream.user_name,
//                             streamer_id: liveStream.user_id,
//                             profile_image_url: liveStream.profile_image_url,
//                             channel_url: `https://www.twitch.tv/${liveStream.user_name}`,
//                             is_live: true,
//                             last_live_update: liveStream.started_at,
//                             description: liveStream.description || "", // Assuming you may need this from another API
//                             stream_info: {
//                                 stream_title: liveStream.title,
//                                 viewer_count: liveStream.viewer_count,
//                                 thumbnail_url: liveStream.thumbnail_url,
//                                 game_name: liveStream.game_name,
//                             },
//                             last_updated: currentTime,
//                             language: liveStream.language,
//                         },
//                     },
//                     { upsert: true } // This will insert a new document if one doesn't already exist
//                 );
//             } else {
//                 // Streamer is offline: Update their `is_live` status to false
//                 await Streamer.updateOne(
//                     // This below line converts the case sensitive comparing to case insensitive
//                     { user_name: { $regex: `^${user}$`, $options: "i" } },
//                     {
//                         $set: {
//                             is_live: false,
//                             stream_info: null, // Clear stream info since they're offline
//                             last_updated: currentTime,
//                         },
//                     }
//                 );
//             }
//         });

//         console.log("Step 3 passed");

//         res.status(200).send({
//             data: result,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             message: "Failed to fetch live streams",
//             error: error.message,
//         });
//     }
// };

// gets all the streamers who are live in the database for the string given in the request body
exports.getStreamerData = async (req, res) => {
    const streamers = req.body;

    if (!streamers || streamers.length === 0)
        return res.status(400).send({ message: "Streamer name is required" });

    try {
        const streamerData = await Streamer.find({
            user_name: {
                $in: streamers.map(
                    (streamer) => new RegExp(`^${streamer}$`, "i")
                ),
            },
            is_live: true,
        });

        res.status(200).json({ data: streamerData });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch streamers" });
    }
};
