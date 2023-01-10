class UserInfoRepository {
  constructor(UserModel, UserImageModel, PostModel, PostImageModel) {
    this.userModel = UserModel;
    this.userImageModel = UserImageModel;
    this.postModel = PostModel;
    this.postImageModel = PostImageModel;
  }

  // 내 정보 조회
  findByUserId = async (user_id) => {
    console.log('user_id: ', user_id);
    const userInfo = await this.userModel.findOne({
      where: {
        user_id: user_id,
      },
      attributes: ['user_id', 'email', 'nickname'],
      include: [
        {
          model: this.userImageModel,
          attributes: ['src'],
        },
      ],
    });

    return userInfo;
  };

  // 내 정보 수정: User 찾기(비밀번호 확인)
  findUserPassword = async (user_id) => {
    const find_user = await this.userModel.findOne({
      where: {
        user_id: user_id,
      },
    });

    return find_user;
  };

  // 내 정보 수정
  updateUserInfo = async (user_id, password, nickname, image) => {
    await this.userModel.update(
      {
        password: password,
        nickname: nickname,
      },
      {
        where: {
          user_id: user_id,
        },
      },
    );

    if (image) {
      await this.userImageModel.update(
        {
          src: image,
        },
        {
          where: {
            user_id: user_id,
          },
        },
      );
    }
  };

  // 내 게시글 조회
  findMyPosts = async (user_id) => {
    const find_user = await this.userModel.findOne({
      where: {
        user_id: user_id,
      },
    });

    const all_my_posts = await this.postModel.findAll({
      where: {
        user_id: user_id,
      },
      attributes: ['post_id'],
      include: [
        {
          model: this.postImageModel,
          attributes: ['src'],
        },
      ],
    });

    return {
      user_id: find_user.user_id,
      nickname: find_user.nickname,
      Posts: all_my_posts,
    };
  };
}

module.exports = UserInfoRepository;
