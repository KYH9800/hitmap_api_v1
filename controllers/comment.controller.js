const { create_comment, delete_comment, update_comment } = require('../services/comment.service');

const logger = require('../config/loggers');

class PostController {
  createComment = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { postId } = req.params;
      const { content } = req.body;

      await create_comment(user_id, postId, content);

      res.status(201).json({ message: '댓글 작성 완료' });
    } catch (error) {
      logger.error(error.message || error);
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '댓글 작성 실패' });
      }
    }
  };

  deleteComment = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { commentId } = req.params;

      await delete_comment(user_id, commentId);

      return res.status(200).json({ message: '댓글 삭제 완료' });
    } catch (error) {
      logger.error(error.message || error);
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '댓글 삭제 실패' });
      }
    }
  };

  updateComment = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { commentId } = req.params;
      const { content } = req.body;

      await update_comment(user_id, commentId, content);

      return res.status(201).json({ message: '댓글 수정에 성공하였습니다.' });
    } catch (error) {
      logger.error(error.message || error);
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '댓글 수정에 실패 했습니다.' });
      }
    }
  };
}

module.exports = PostController;
