const mongoose = require("mongoose");

const youtubeVideosSchema = new mongoose.Schema({
    channelId: String,
    channelName: String,
    channelImageUrl: String,
    videos: {
        page: Number,
        totalPages: Number,
        items: [
            {
                videoId: String,
                videoTitle: String,
                publishedAt: Date,
                thumbnailUrl: String,
                videoUrl: String,
                viewCount: Number,
                duration: String,
            },
        ],
        nextPageToken: String,
        prevPageToken: String,
    },
});

module.exports = mongoose.model("YoutubeVideos", youtubeVideosSchema);
