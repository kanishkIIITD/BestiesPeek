const mongoose = require("mongoose");

const liveStatusSchema = new mongoose.Schema({
    streamer_id: {
        type: String,
        ref: "Streamer",
    },
    is_live: Boolean,
    stream_info: {
        stream_title: String,
        viewer_count: Number,
        thumbnail_url: String,
        game_name: String,
    },
    last_updated: Date,
    // started_at: Date,
    language: String,
});

module.exports = mongoose.model("LiveStatus", liveStatusSchema);
