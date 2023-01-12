const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth-middleware');

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/:postId', auth.is_logged_in_refresh_token, commentController.createComment);
router.delete('/:commentId', auth.is_logged_in_refresh_token, commentController.deleteComment);
router.patch('/:commentId', auth.is_logged_in_refresh_token, commentController.updateComment);

module.exports = router;
