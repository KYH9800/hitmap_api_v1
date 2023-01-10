const express = require('express');
const router = express.Router();

const UserInfoController = require('../controllers/userInfo.controller');
const userInfoController = new UserInfoController();

const auth = require('../middlewares/auth-middleware');
const upload = require('../multer/awsMulterModules');

router
  .get('/', auth.isLoggedIn_refresh_token, userInfoController.getMyInfo) // 내 정보 조회
  .patch('/', upload.single('image'), userInfoController.updateUserInfo); // 내 정보 수정
module.exports = router;
