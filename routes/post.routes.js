const express = require('express');
const router = express.Router();
const upload = require('../multer/awsMulterModules');
const auth = require('../middlewares/auth-middleware');

const PostController = require('../controllers/post.controller');
const postController = new PostController();

router.post('/', auth.is_logged_in_refresh_token, upload.array('image', 5), postController.createPost);
router.get('/', auth.check_logged_in_user, postController.findAllPosts);
router.get('/:postId', auth.check_logged_in_user, postController.findDetailPost);
router.delete('/:postId', auth.is_logged_in_refresh_token, postController.deletePost);
router.patch('/:postId', auth.is_logged_in_refresh_token, postController.updatePost);
router.patch('/:postId/like', auth.is_logged_in_refresh_token, postController.likePost);

module.exports = router;
