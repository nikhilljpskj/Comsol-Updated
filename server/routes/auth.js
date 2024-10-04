const express = require('express');
const { register, login, logout, getUser } = require('../controllers/authController');

const router = express.Router();

// Route to get the logged-in user's details
router.get('/current-user', getUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;  // This should be exporting the router
