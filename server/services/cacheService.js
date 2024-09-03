// services/cacheService.js
const redisClient = require("../config/redisClient");

const getCachedData = async (cacheKey) => {
    try {
        const data = await redisClient.get(cacheKey);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    } catch (error) {
        console.log(`Error getting cache for key ${cacheKey}:`, error);
        return null;
    }
};

const setCachedData = async (cacheKey, data, ttl = 600) => {
    try {
        await redisClient.setEx(cacheKey, ttl, JSON.stringify(data));
    } catch (error) {
        console.log(`Error setting cache for key ${cacheKey}:`, error);
    }
};

module.exports = {
    getCachedData,
    setCachedData,
};
