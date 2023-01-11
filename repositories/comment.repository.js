class CommentRepository {
  constructor(CommentModel) {
    this.commentModel = CommentModel;
  }

  createComment = async (user_id, post_id, content) => {
    const createComment = await this.commentModel.create({ user_id, post_id, content });

    return createComment;
  };

  deleteComment = async (comment_id) => {
    const deleteComment = await this.commentModel.destroy({ where: { comment_id } });

    return deleteComment;
  };

  findComment = async (comment_id) => {
    const findComment = await this.commentModel.findOne({ where: { comment_id } });

    return findComment;
  };

  findComments = async (post_id) => {
    const findComments = await this.commentModel.findAll({
      where: { post_id },
      order: [['created_at', 'DESC']],
    });

    return findComments;
  };

  updateComment = async (comment_id, content) => {
    const updateComment = await this.commentModel.update({ content }, { where: { comment_id } });

    return updateComment;
  };
}

module.exports = CommentRepository;
