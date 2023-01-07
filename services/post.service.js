const PostRepository = require('../repositories/post.repository');

const { Post } = require('../models');

const postRepository = new PostRepository(Post);

const create_post = (user_id, content) => {
  const createPost = postRepository.createPost(user_id, content);

  return createPost;
};

module.exports = {
  create_post,
};
