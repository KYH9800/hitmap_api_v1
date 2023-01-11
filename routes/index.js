const express = require('express');
const router = express.Router();

// 고윤혁
const userRouter = require('./user.routes');
router.use('/user', userRouter);

// 고윤혁
const userInfoRouter = require('./userInfo.routes');
router.use('/me', userInfoRouter);

// 이규형
const postRouter = require('./post.routes');
router.use('/post', postRouter);

// 이규형
const commentRouter = require('./comment.routes');
router.use('/comment', commentRouter);

module.exports = router;
