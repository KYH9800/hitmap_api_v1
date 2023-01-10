const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

const CheckController = require('../controllers/check.controller');
const checkController = new CheckController();

const upload = require('../multer/awsMulterModules');
const auth = require('../middlewares/auth-middleware');

router
  .post('/signup', auth.isNotLoggedIn, upload.single('image'), signupController.signup) // 회원가입
  .post('/login', auth.isNotLoggedIn, loginController.login) // 로그인
  .post('/logout', auth.isLoggedIn, loginController.logout) // 로그아웃
  .get('/email', auth.isNotLoggedIn, checkController.findByEmail) // 이메일 중복확인
  .get('/nickname', auth.isNotLoggedIn, checkController.findByNickname); // 닉네임 중복확인

module.exports = router;
