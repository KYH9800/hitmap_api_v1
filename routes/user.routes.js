const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

const upload = require('../multer/awsMulterModules');

// 회원가입
router.post('/signup', upload.single('image'), userController.signup);

// 로그인
router.post('/login', userController.login);

module.exports = router;
