const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

// 회원가입
router.post('/signup', userController.signup);

// 로그인
router.post('/login', userController.login);

module.exports = router;
