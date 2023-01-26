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
  .post('/signup', auth.is_not_logged_in, upload.single('image'), signupController.signup) // 회원가입
  .post('/login', auth.is_not_logged_in, loginController.login) // 로그인
  .post('/logout', auth.is_logged_in, loginController.logout) // 로그아웃
  .post('/email', auth.is_not_logged_in, checkController.findByEmail) // 이메일 중복확인
  .post('/nickname', auth.is_not_logged_in, checkController.findByNickname) // 닉네임 중복확인
  .get('/kakaoLogin/start', auth.is_not_logged_in, loginController.startKakaoLogin) // 카카오 로그인
  .post('/kakaoLogout', auth.is_logged_in, loginController.kakaoLogout); // 카카오 로그아웃

module.exports = router;
