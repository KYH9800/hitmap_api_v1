const Sequelize = require('sequelize');
const { sequelize } = require('../models');

class PostRepository {
  constructor(PostModel, PostImageModel, FishInfoModel, CommentModel, LikeModel) {
    this.postModel = PostModel;
    this.postImageModel = PostImageModel;
    this.fishInfoModel = FishInfoModel;
    this.commentModel = CommentModel;
    this.likeModel = LikeModel;
  }

  createPost = async (user_id, content) => {
    const createPost = await this.postModel.create({
      user_id,
      content,
    });

    return createPost;
  };

  createPostImages = async (src, post_id) => {
    const images = src.map(
      async (image) =>
        await this.postImageModel.create({
          src: image.location,
          post_id,
        }),
    );
    return images;
  };

  createFishInfo = async (fish_name, post_id) => {
    const createFishInfo = await this.fishInfoModel.create({ fish_name, post_id });

    return createFishInfo;
  };

  findAllPosts = async () => {
    const posts = await this.postModel.findAll({
      attributes: ['post_id', 'user_id', 'content'],
      include: [
        {
          model: this.postImageModel,
          attributes: ['src'],
        },
        {
          model: this.fishInfoModel,
          attributes: ['fish_name'],
        },
        {
          model: this.commentModel,
          attributes: ['content'],
        },
        {
          model: this.likeModel,
          attributes: ['post_id'],
        },
      ],
      order: [['created_at', 'DESC']],
    });
    return posts;
  };

  findPost = async (post_id) => {
    const post = await this.postModel.findOne({
      where: { post_id },
      include: [
        {
          model: this.postImageModel,
          attributes: ['src'],
        },
        {
          model: this.fishInfoModel,
          attributes: ['fish_name'],
        },
        {
          model: this.likeModel,
          attributes: ['post_id'],
        },
      ],
    });

    return post;
  };

  deletePost = async (post_id) => {
    const deletePost = await this.postModel.destroy({ where: { post_id } });

    return deletePost;
  };

  updatePost = async (post_id, content) => {
    const updatePost = await this.postModel.update({ content }, { where: { post_id } });

    return updatePost;
  };

  updateFishInfo = async (post_id, fish_name) => {
    const updateFishInfo = await this.fishInfoModel.update({ fish_name }, { where: { post_id } });

    return updateFishInfo;
  };

  likePost = async (user_id, post_id) => {
    const isLike = await this.likeModel.findAll({ where: { user_id, post_id } });

    if (!isLike.length) {
      await this.likeModel.create({ user_id, post_id });
      return { message: '좋아요' };
    } else {
      await this.likeModel.destroy({ where: { user_id, post_id } });
      return { message: '좋아요 취소' };
    }
  };

  countLike = async (post_id) => {
    const likes = await this.likeModel.findAll({
      where: { post_id },
      attributes: [[Sequelize.fn('COUNT', sequelize.col('like_id')), 'Likes']],
    });

    return likes[0];
  };
}

module.exports = PostRepository;
