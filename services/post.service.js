const PostRepository = require('../repositories/post.repository');

const { Post, PostImage, FishInfo } = require('../models');

const postRepository = new PostRepository(Post, PostImage, FishInfo);

const create_post = async (user_id, content, fishName, src) => {
  if (!user_id) {
    throw { errorMessage: '로그인된 사용자만 접근이 가능합니다', code: 403 };
  }
  if (!content) {
    throw { errorMessage: '게시글이 존재하지 않습니다.', code: 412 };
  }
  if (src.length === 0) {
    throw { errorMessage: '이미지가 존재하지 않습니다.', code: 412 };
  }
  if (!fishName) {
    throw { errorMessage: '물고기에 대한 정보가 없습니다.', code: 412 };
  }

  const createPost = await postRepository.createPost(user_id, content);

  const createPostImages = await postRepository.createPostImages(src, createPost.post_id);

  const createFishInfo = await postRepository.createFishInfo(fishName, createPost.post_id);

  return createPost, createPostImages, createFishInfo;
};

const find_all_post = async () => {
  const posts = await postRepository.findAllPosts();

  return posts;
};

const find_post = async (post_id) => {
  const post = await postRepository.findPost(post_id);

  return post;
};

const delete_post = async (user_id, post_id) => {
  const post = await postRepository.findPost(post_id);

  const deletedPost = await postRepository.deletePost(post_id);

  if (!user_id) {
    throw { errorMessage: '로그인된 사용자만 접근이 가능합니다', code: 403 };
  }
  if (user_id !== post.user_id) {
    throw { errorMessage: '본인이 작성한 게시글만 삭제가 가능합니다.', code: 401 };
  }

  return deletedPost;
};

const update_post = async (user_id, post_id, content, fish_name) => {
  const post = await postRepository.findPost(post_id);

  const updatePost = await postRepository.updatePost(post_id, content);
  await postRepository.updateFishInfo(post_id, fish_name);

  if (!user_id) {
    throw { errorMessage: '로그인된 사용자만 접근이 가능합니다', code: 403 };
  }
  if (user_id !== post.user_id) {
    throw { errorMessage: '본인이 작성한 게시글만 수정이 가능합니다.', code: 401 };
  }

  return updatePost;
};

module.exports = {
  create_post,
  find_all_post,
  find_post,
  delete_post,
  update_post,
};
