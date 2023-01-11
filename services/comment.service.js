const CommentRepository = require('../repositories/comment.repository');

const { Comment } = require('../models');

const commentRepository = new CommentRepository(Comment);

const create_comment = async (user_id, post_id, content) => {
  const createComment = await commentRepository.createComment(user_id, post_id, content);

  return createComment;
};

const delete_comment = async (user_id, comment_id) => {
  const comment = await commentRepository.findComment(comment_id);

  if (user_id !== comment.user_id) {
    throw { errorMessage: '본인이 작성한 댓글만 삭제 가능합니다', code: 401 };
  }

  const deleteComment = await commentRepository.deleteComment(comment_id);

  return deleteComment;
};

const update_comment = async (user_id, comment_id, content) => {
  const comment = await commentRepository.findComment(comment_id);

  if (user_id !== comment.user_id) {
    throw { errorMessage: '본인이 작성한 댓글만 수정이 가능합니다', code: 401 };
  }

  const updateComment = await commentRepository.updateComment(comment_id, content);

  return updateComment;
};

module.exports = {
  create_comment,
  delete_comment,
  update_comment,
};
