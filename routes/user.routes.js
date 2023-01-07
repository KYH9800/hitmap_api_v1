const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

const upload = require('../multer/awsMulterModules');

router
  .post('/signup', upload.single('image'), signupController.signup) // 회원가입
  .post('/login', loginController.login); // 로그인

module.exports = router;
