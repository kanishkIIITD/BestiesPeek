require("dotenv").config();

const Streamer = require("../models/Streamer");

// gets all the streamers who are live in the database for the string given in the request body
exports.getStreamerData = async (req, res) => {
    const streamers = req.body;

    if (!streamers || streamers.length === 0)
        return res.status(400).send({ message: "Streamer name is required" });

    try {
        const batchSize = 5;
        const results = [];
        for (let i = 0; i < streamers.length; i += batchSize) {
            const batch = streamers.slice(i, i + batchSize);

            const batchResult = await Streamer.find({
                user_name: {
                    $in: batch.map(
                        (streamer) => new RegExp(`^${streamer}$`, "i")
                    ),
                },
                is_live: true,
            }).lean();

            results.push(...batchResult);
        }

        res.status(200).json({ data: results });
    } catch (error) {
        console.log("Error while fetching streamers:", error);
        res.status(500).json({ error: "Failed to fetch streamers" });
    }
};
