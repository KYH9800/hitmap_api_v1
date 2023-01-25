const {
  create_post,
  find_all_posts,
  find_post,
  delete_post,
  update_post,
  like_post,
} = require('../services/post.service');

class PostController {
  createPost = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { content, fishName } = req.body;
      const src = req.files;

      await create_post(user_id, content, fishName, src);

      res.status(201).json({ message: '게시글 작성 성공' });
    } catch (error) {
      console.log(error);
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '게시글 작성에 실패 했습니다.' });
      }
    }
  };

  findAllPosts = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { lastId } = req.query;
      const posts = await find_all_posts(user_id, lastId);

      res.status(200).json({ posts });
    } catch (error) {
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '게시글 조회에 실패 했습니다.' });
      }
    }
  };

  findDetailPost = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { postId } = req.params;

      const post = await find_post(user_id, postId);

      res.status(200).json({ post });
    } catch (error) {
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '게시글 조회에 실패 했습니다.' });
      }
    }
  };

  deletePost = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { postId } = req.params;

      await delete_post(user_id, postId);

      res.status(204).json({ message: '게시글 삭제에 성공했습니다.' });
    } catch (error) {
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '게시글 조회에 실패 했습니다.' });
      }
    }
  };

  updatePost = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { postId } = req.params;
      const { content, fishName } = req.body;

      await update_post(user_id, postId, content, fishName);

      res.status(201).json({ message: '게시글 수정에 성공하였습니다.' });
    } catch (error) {
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
      }
    }
  };

  likePost = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { postId } = req.params;

      const likePost = await like_post(user_id, postId);

      res.status(200).json({ likePost });
    } catch (error) {
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
      }
    }
  };
}

module.exports = PostController;
