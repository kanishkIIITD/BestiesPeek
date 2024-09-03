// config/redisClient.js
const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
    // host: "127.0.0.1", // Default Memurai host
    // port: 6379, // Default Memurai port
    url: process.env.REDIS_URL,
    // url: "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

// Connect the Redis client
(async () => {
    try {
        await redisClient.connect();
        console.log("Redis client connected");
    } catch (error) {
        console.log("Could not connect to Redis", error);
        process.exit(1); // Exit process if Redis connection fails
    }
})();

module.exports = redisClient;
