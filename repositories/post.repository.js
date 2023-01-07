class PostRepository {
  constructor(PostModel){
    this.postModel = PostModel;
  }

  createPost = async (user_id, content) => {
    const createPost = await this.postModel.create({
      user_id,
      content,
    });
    
    return createPost;
  };
}

module.exports = PostRepository;
