var express = require('express');
var router = express.Router();

var authenticateToken = require('../middleware/authMiddleware');

var authcontroller = require('../controllers/auth.controller');

/* POST SIGN UP */
router.post('/register', authcontroller.register);

/* POST LOG IN */
router.post('/login', authcontroller.login);

/* GET Sign UP Form */
router.get('/signup', authcontroller.signUpPage);

/* GET Sign In Form */
router.get('/signin', authcontroller.signInPage);

/* GET Profile */
router.get('/profile', authenticateToken, authcontroller.profile);

/* GET LOGOUT */
router.get('/logout', authcontroller.logOut);

module.exports = router;