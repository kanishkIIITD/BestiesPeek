const redisClient = require("../config/redisClient");

// Set rate limit parameters
const RATE_LIMIT_WINDOW = 60; // Time window in seconds (e.g., 60 seconds)
const MAX_REQUESTS = 100; //Max requests per window

const checkRateLimit = async () => {
    const rateLimitKey = "youtube_api_rate_limit";

    // Get the current count
    const currentCount = await redisClient.get(rateLimitKey);

    if (currentCount && parseInt(currentCount) >= MAX_REQUESTS) {
        // If the limit is reached, return false
        return false;
    } else {
        // Otherwise, increment the count and set TTL if it's a new window
        await redisClient
            .multi()
            .incr(rateLimitKey) //Increment the count
            .expire(rateLimitKey, RATE_LIMIT_WINDOW) //Set the expiration time
            .exec();

        return true;
    }
};

module.exports = checkRateLimit;
