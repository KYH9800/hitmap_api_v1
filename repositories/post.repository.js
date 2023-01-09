class PostRepository {
  constructor(PostModel, PostImageModel, FishInfoModel) {
    this.postModel = PostModel;
    this.postImageModel = PostImageModel;
    this.fishInfoModel = FishInfoModel;
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
      include: [
        {
          model: this.postImageModel,
          attributes: ['src'],
        },

        {
          model: this.fishInfoModel,
          attributes: ['fish_name'],
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
      ],
    });

    return post;
  };

  deletePost = async (post_id) => {
    const deletePost = await this.postModel.destroy({ where: { post_id } });

    return deletePost;
  };

  updatePost = async (post_id, content) => {
    console.log(post_id, content);
    const updatePost = await this.postModel.update({ content }, { where: { post_id } });

    return updatePost;
  };

  updateFishInfo = async (post_id, fish_name) => {
    const updateFishInfo = await this.fishInfoModel.update({ fish_name }, { where: { post_id } });

    return updateFishInfo;
  };
}

module.exports = PostRepository;
