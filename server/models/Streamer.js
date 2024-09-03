const mongoose = require("mongoose");

const streamerSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true, index: true }, // String,
    streamer_id: { type: String, required: true, unique: true, index: true },
    profile_image_url: { type: String, index: true },
    channel_url: String,
    is_live: { type: Boolean, required: true, index: true }, // Boolean,
    last_live_update: Date,
    description: String,

    // for Live Status
    stream_info: {
        stream_title: String,
        viewer_count: Number,
        thumbnail_url: String,
        game_name: String,
    },
    last_updated: Date,
    language: String,
    user_login: { type: String, required: true, unique: true, index: true }, // ideally this should be used for comparing while searching in the database as this is all lowercase
});

module.exports = mongoose.model("Streamer", streamerSchema);
