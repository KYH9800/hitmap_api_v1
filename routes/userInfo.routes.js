const express = require('express');
const router = express.Router();

const UserInfoController = require('../controllers/userInfo.controller');
const userInfoController = new UserInfoController();

const CheckController = require('../controllers/check.controller');
const checkController = new CheckController();

const auth = require('../middlewares/auth-middleware');
const upload = require('../multer/awsMulterModules');

router
  .get('/', auth.is_logged_in_refresh_token, userInfoController.getMyInfo) // 내 정보 조회
  .get('/myPost', auth.is_logged_in_refresh_token, userInfoController.getMyPosts) // 내 게시글 조회
  .patch('/', auth.is_logged_in_refresh_token, upload.single('image'), userInfoController.updateUserInfo) // 내 정보 수정
  .post('/myNickname', auth.is_logged_in_refresh_token, checkController.findByNickname) // 닉네임 중복확인
  .post('/', auth.is_logged_in_refresh_token, userInfoController.deleteUserAllInfo); // 회원탈퇴

module.exports = router;
