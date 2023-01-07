const { create_post } = require('../services/post.service');

class PostController {
  createPost = async (req, res) => {
    try {
      const user_id = 1;
      const { content } = req.body;
      await create_post(user_id, content);

      res.status(201).json({ message: '게시글 작성 성공' });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = PostController;
