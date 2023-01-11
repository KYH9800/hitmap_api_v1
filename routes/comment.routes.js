const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth-middleware');

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/:postId', auth.isLoggedIn_refresh_token, commentController.createComment);
router.delete('/:commentId', auth.isLoggedIn_refresh_token, commentController.deleteComment);
router.patch('/:commentId', auth.isLoggedIn_refresh_token, commentController.updateComment);

module.exports = router;
