const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

const upload = require('../multer/awsMulterModules');
const auth = require('../middlewares/auth-middleware');

router
  .post('/signup', auth.isNotLoggedIn, upload.single('image'), signupController.signup) // 회원가입
  .post('/login', auth.isNotLoggedIn, loginController.login) // 로그인
  .post('/logout', auth.isLoggedIn, loginController.logout); // 로그아웃

module.exports = router;
