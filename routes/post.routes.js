const express = require('express');
const router = express.Router();
const upload = require('../multer/awsMulterModules');

const PostController = require('../controllers/post.controller');
const postController = new PostController();

router.post('/', upload.array('image', 5), postController.createPost);
router.get('/', postController.findAllPosts);
router.get('/:postId', postController.findDetailPost);
router.delete('/:postId', postController.deletePost)
router.patch('/:postId', postController.updatePost)

module.exports = router;
