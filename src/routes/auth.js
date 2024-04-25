/*
# Authentication Routes

This file defines two routes related to user authentication.

## POST /signup

This route is used to register a new user. It uses the `signup` method from the `authController`.

**Request Body:**
- The request body should contain the user details required for registration.

## POST /login

This route is used to authenticate a user. It uses the `login` method from the `authController`.

**Request Body:**
- The request body should contain the user's login credentials.
*/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);

module.exports = router;
