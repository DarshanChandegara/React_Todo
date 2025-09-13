const express = require('express');
const { body } = require('express-validator');
const { register, login, refresh, logout, getMe } = require('../controller/user.controller');
const auth = require('../middleware/auth');

const router = express.Router();

// Register user
router.route('/register').post([
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], register);

// Login user
router.route('/login').post([
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], login);

// Refresh access token
router.route('/refresh').post(refresh);

// Get current user info
router.route('/me').get(auth, getMe);

// Logout - remove refresh token and clear cookies
router.route('/logout').post(logout);

module.exports = router;