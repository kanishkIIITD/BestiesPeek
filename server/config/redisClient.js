// config/redisClient.js
const redis = require("redis");
// const logger = require("./logger"); // Assuming you have a logger setup

const redisClient = redis.createClient({
    host: "127.0.0.1", // Default Memurai host
    port: 6379, // Default Memurai port
});

redisClient.on("error", (err) => {
    // logger.error("Redis Client Error", err);
    console.log("Redis Client Error", err);
});

redisClient.on("connect", () => {
    // logger.info("Connected to Redis");
    console.log("Connected to Redis");
});

// Connect the Redis client
(async () => {
    try {
        await redisClient.connect();
        // logger.info("Redis client connected");
        console.log("Redis client connected");
    } catch (error) {
        // logger.error("Could not connect to Redis", error);
        console.log("Could not connect to Redis", error);
        process.exit(1); // Exit process if Redis connection fails
    }
})();

module.exports = redisClient;
