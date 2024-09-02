require("dotenv").config();

const Streamer = require("../models/Streamer");

// gets all the streamers who are live in the database for the string given in the request body
exports.getStreamerData = async (req, res) => {
    const streamers = req.body;

    if (!streamers || streamers.length === 0)
        return res.status(400).send({ message: "Streamer name is required" });

    try {
        const batchSize = 10;
        const batches = [];
        for (let i = 0; i < streamers.length; i += batchSize) {
            batches.push(streamers.slice(i, i + batchSize));
        }

        const results = await Promise.all(
            batches.map(async (batch) => {
                return await Streamer.find({
                    user_name: {
                        $in: streamers.map(
                            (streamer) => new RegExp(`^${streamer}$`, "i")
                        ),
                    },
                    is_live: true,
                });
            })
        );

        const streamerData = results.flat();

        res.status(200).json({ data: streamerData });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch streamers" });
    }
};
