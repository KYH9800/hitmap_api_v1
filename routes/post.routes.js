const express = require('express');
const router = express.Router();
const upload = require('../multer/awsMulterModules');
const auth = require('../middlewares/auth-middleware');

const PostController = require('../controllers/post.controller');
const postController = new PostController();

router.post('/', auth.isLoggedIn_refresh_token, upload.array('image', 5), postController.createPost);
router.get('/', postController.findAllPosts);
router.get('/:postId', postController.findDetailPost);
router.delete('/:postId', auth.isLoggedIn_refresh_token, postController.deletePost);
router.patch('/:postId', auth.isLoggedIn_refresh_token, postController.updatePost);
router.patch('/:postId/like', auth.isLoggedIn_refresh_token, postController.likePost);

module.exports = router;
