const jwt = require('jsonwebtoken');


// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization'); // Get the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the verified user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};



module.exports = verifyToken;
