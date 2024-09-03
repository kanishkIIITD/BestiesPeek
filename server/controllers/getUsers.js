const Streamer = require("../models/Streamer");
const axios = require("axios");
const redisClient = require("../config/redisClient");

exports.getUsers = async (req, res) => {
    // await redisClient.del(["streamer_NAPOLEONSLIVE"]);
    try {
        const { streamerName } = req.body;

        // Validate streamername
        if (!streamerName || streamerName.length === 0)
            return res
                .status(400)
                .send({ message: "Streamer name is required" });

        // Cache key for the streamer
        const cacheKey = `streamer_${streamerName}`;

        // Check if the streamer is already in the cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                message: "Data found in cache",
                data: JSON.parse(cachedData),
            });
        }

        // Search DB for streamer

        let streamer = await Streamer.findOne({
            $or: [{ user_login: streamerName }, { streamer_id: streamerName }],
        });

        // Return streamer if found and it has profile image and user name
        // And the data in the cache
        if (streamer && streamer?.profile_image_url && streamer?.user_name) {
            await redisClient.setEx(cacheKey, 180, JSON.stringify(streamer));
            return res.status(200).json({ data: streamer });
        } else {
            // Validate environment variables
            const { CLIENT_ID, ACCESS_TOKEN } = process.env;
            if (!CLIENT_ID || !ACCESS_TOKEN) {
                throw new Error("Missing required environment variables");
            }

            // Fetch User Details
            const baseUrl = "https://api.twitch.tv/helix/users";
            const response = await axios.get(
                `${baseUrl}?login=${streamerName}`,
                {
                    headers: {
                        "Client-ID": CLIENT_ID,
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                }
            );

            const result = response.data.data[0];
            if (!result) {
                return res
                    .status(404)
                    .json({ message: "Streamer not found on Twitch" });
            }

            // Find or create streamer in DB

            streamer = await Streamer.findOneAndUpdate(
                { streamer_id: result.id },
                {
                    $set: {
                        user_login: result.login,
                        user_name: result.display_name,
                        profile_image_url: result.profile_image_url,
                        description: result.description,
                        last_updated: new Date(),
                        channel_url: `https://www.twitch.tv/${result.login}`,
                        is_live: false,
                        stream_info: null,
                    },
                },
                { new: true, upsert: true }
            );

            // Save streamer in cache
            await redisClient.setEx(cacheKey, 180, JSON.stringify(streamer));
            // Return streamer
            return res.status(200).json({ data: streamer });
        }
    } catch (error) {
        console.log("Error while fetching User Details:", error);
        res.status(500).json({ error: "Failed to fetch User Details" });
    }
};
