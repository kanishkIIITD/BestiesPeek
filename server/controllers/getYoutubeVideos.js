const axios = require("axios");
const moment = require("moment-timezone");

const YoutubeVideos = require("../models/YoutubeVideos");
const redisClient = require("../config/redisClient");
const checkRateLimit = require("../services/checkRateLimit");
const {
    fetchVideoDetails,
    fetchChannelDetails,
} = require("../services/youtubeService");

// Youtube api configuration
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

// Define time zone
const CHANNEL_TIME_ZONE = "Asia/Kolkata";

// Define active and inactive TTLs
const ACTIVE_TTL = 1800; // 30 mins
const INACTIVE_TTL = 7200; // 2 hours

// Determine if the current time is withing the active period
const isActivePeriod = () => {
    const currentTime = moment().tz(CHANNEL_TIME_ZONE);
    const currentHour = currentTime.hour();
    const startActiveHour = 14; // 2PM
    const endActiveHour = 2; // 2AM

    console.log(currentTime.hour());
    return (
        (currentHour >= startActiveHour && currentHour < 24) || // from 2PM to midnight
        (currentHour >= 0 && currentHour < endActiveHour) // from midnight to 2AM
    );
};

// Function to set cache with dynamic TTL
const setCacheWithDynamicTTL = async (key, data) => {
    const ttl = isActivePeriod() ? ACTIVE_TTL : INACTIVE_TTL;
    await redisClient.setEx(key, ttl, JSON.stringify(data));
};

class YoutubeController {
    // Fetch videos for a specific channel with pagination
    static async fetchVideosLogic(channelId, pageToken = "") {
        try {
            const isAllowed = await checkRateLimit();

            if (!isAllowed) {
                return {
                    success: false,
                    message: "Rate limit exceeded. Please try again later.",
                };
            }

            // Cache key based on channelId and pageToken
            const cacheKey = `channel_${channelId}_page_${
                pageToken || "first"
            }`;

            // Check if data is in cache
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                console.log("Data found in cache");

                return {
                    success: true,
                    message: "Data found in cache",
                    data: JSON.parse(cachedData),
                };
            }

            // If not in cache, fetch from YouTube API
            const response = await axios.get(YOUTUBE_API_URL, {
                params: {
                    part: "snippet",
                    channelId: channelId,
                    maxResults: 10, // Number of videos per page
                    pageToken: pageToken,
                    key: YOUTUBE_API_KEY,
                    order: "date", // Used to sort the videos(Other options: viewCount)
                },
            });

            const data = response.data;

            console.log("Youtube response successful");

            if (!data || !data.items || data.items.length === 0) {
                return { success: false, error: "No videos found" };
            }

            // Extract video IDs
            const videoIds = data.items
                .map((item) => item.id.videoId)
                .filter(Boolean)
                .join(",");

            if (!videoIds) {
                console.log(`No video IDs found for channel ${channelId}`);
                return { success: false, error: "No videos found" };
            }

            // Fetch video details
            const videoResponse = await fetchVideoDetails(videoIds);
            const videoData = videoResponse.data;
            // console.log(videoData);
            console.log("Video response successful");

            const videoDetailsMap = {};

            videoData.items.forEach((item) => {
                videoDetailsMap[item.id] = item;
            });

            // Transform video details
            const transformedVideos = data.items
                .map((item) => {
                    const videoId = item.id.videoId;
                    const videoDetail = videoDetailsMap[videoId];
                    if (!videoDetail) {
                        console.log(
                            `Video ID: ${videoId} not found in YouTube API.`
                        );
                        return null;
                    }
                    return {
                        videoId: videoId,
                        videoTitle: item.snippet.title,
                        publishedAt: new Date(item.snippet.publishedAt),
                        thumbnailUrl: item.snippet.thumbnails.high.url,
                        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
                        viewCount: videoDetail.statistics
                            ? videoDetail.statistics.viewCount
                            : 0, // if available
                        duration: videoDetail.contentDetails
                            ? videoDetail.contentDetails.duration
                            : "", // if available
                    };
                })
                .filter(Boolean); // Filter out null values

            // Fetch channel details
            const channelResponse = await fetchChannelDetails(channelId);
            const channelData = channelResponse.data;

            let channelName = "Unknown";
            let channelImageUrl = "";

            if (
                channelData &&
                channelData.items &&
                channelData.items.length > 0
            ) {
                channelName = channelData.items[0].snippet.title;
                channelImageUrl =
                    channelData.items[0].snippet.thumbnails.default.url;
            } else {
                console.log(
                    `Channel ID: ${channelId} not found in YouTube API.`
                );
            }

            console.log("Channel response successful");

            // Transform API response

            const transformedData = {
                channelId: channelId,
                channelName: channelName,
                channelImageUrl: channelImageUrl,
                videos: {
                    page: 1,
                    totalPages: Math.ceil(
                        data.pageInfo.totalResults /
                            data.pageInfo.resultsPerPage
                    ),
                    items: transformedVideos,
                    nextPageToken: data.nextPageToken || null,
                    prevPageToken: data.prevPageToken || null,
                },
            };

            // Save the fetched data to MongoDB
            let channel = await YoutubeVideos.findOne({ channelId: channelId });
            if (!channel) {
                channel = new YoutubeVideos(transformedData);
                console.log(`Created new channel: ${channelId}`);
            } else {
                channel.videos.page = transformedData.videos.page;
                channel.videos.totalPages = transformedData.videos.totalPages;
                channel.videos.items = transformedData.videos.items; // This way we will have only the most recent 10 videos

                channel.videos.nextPageToken =
                    transformedData.videos.nextPageToken;
                channel.videos.prevPageToken =
                    transformedData.videos.prevPageToken;
            }

            await channel.save();
            console.log(`Saved channel: ${channelId}`);

            // Cache the data with dynamic TTL
            await setCacheWithDynamicTTL(cacheKey, channel);
            console.log(`Cached channel: ${channelId}`);

            // Return the fetched data
            return { success: true, data: channel };
        } catch (error) {
            console.log("Error while fetching videos:", error);
            return { success: false, error: "Error while fetching videos" };
        }
    }

    static fetchVideos = async (req, res) => {
        const { channelId } = req.params;
        const pageToken = req.query.pageToken || "";
        const result = await this.fetchVideosLogic(channelId, pageToken);

        if (result.success) {
            return res.json(result);
        } else {
            return res.status(500).json(result);
        }
    };
}

module.exports = YoutubeController;
