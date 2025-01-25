const redis = require("redis");

// Create and configure the Redis client
const redisClient = redis.createClient({
    host: "127.0.0.1", // Localhost by default
    port: 6379,        // Default Redis port
});

// Event listeners
redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

// Establish connection
(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
