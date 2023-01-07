const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');
const postController = new PostController();

router.post('/', postController.createPost);

module.exports = router;
