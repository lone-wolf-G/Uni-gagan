const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

module.exports = router;
