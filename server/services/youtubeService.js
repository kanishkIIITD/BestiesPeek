// services/youtubeService.js
const axios = require("axios");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_SEARCH_API_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_VIDEOS_API_URL = "https://www.googleapis.com/youtube/v3/videos";
const YOUTUBE_CHANNELS_API_URL =
    "https://www.googleapis.com/youtube/v3/channels";

const fetchSearchData = async (channelId, pageToken) => {
    return await axios.get(YOUTUBE_SEARCH_API_URL, {
        params: {
            part: "snippet",
            channelId: channelId,
            maxResults: 10,
            pageToken: pageToken,
            key: YOUTUBE_API_KEY,
            type: "video",
        },
    });
};

const fetchVideoDetails = async (videoIds) => {
    return await axios.get(YOUTUBE_VIDEOS_API_URL, {
        params: {
            part: "snippet,contentDetails,statistics",
            id: videoIds,
            key: YOUTUBE_API_KEY,
        },
    });
};

const fetchChannelDetails = async (channelId) => {
    return await axios.get(YOUTUBE_CHANNELS_API_URL, {
        params: {
            part: "snippet",
            id: channelId,
            key: YOUTUBE_API_KEY,
        },
    });
};

module.exports = {
    fetchSearchData,
    fetchVideoDetails,
    fetchChannelDetails,
};
