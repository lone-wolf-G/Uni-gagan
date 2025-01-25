const redisClient = require('../redisClient'); // Adjust the path as needed

/* Promisify Redis client methods for easier usage
const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
*/
/**
 * Store OTP in Redis with a specified expiry time.
 * @param {string} email - The email address as the key.
 * @param {string} otp - The OTP to store.
 * @param {number} expiry - Expiry time in seconds.
 */
const storeOtp = async (email, otp, expiry = 300) => {
    try {
        // Directly use redisClient.set() without promisify
        await redisClient.set(email, otp, {
            EX: expiry, // Set expiry time in seconds
        });
        console.log(`OTP stored for ${email}`);
    } catch (error) {
        console.error('Error storing OTP:', error);
        throw error;
    }
};

/**
 * Retrieve OTP from Redis.
 * @param {string} email - The email address as the key.
 * @returns {Promise<string | null>} - The OTP if found, otherwise null.
 */
const getOtp = async (email) => {
    try {
        // Directly use redisClient.get() without promisify
        const otp = await redisClient.get(email);
        console.log(`OTP retrieved for ${email}:`, otp);
        return otp;
    } catch (error) {
        console.error('Error retrieving OTP:', error);
        throw error;
    }
};

/**
 * Delete OTP from Redis.
 * @param {string} email - The email address as the key.
 */
const deleteOtp = async (email) => {
    try {
        // Directly use redisClient.del() without promisify
        await redisClient.del(email);
        console.log(`OTP deleted for ${email}`);
    } catch (error) {
        console.error('Error deleting OTP:', error);
        throw error;
    }
};

module.exports = {
    storeOtp,
    getOtp,
    deleteOtp,
};