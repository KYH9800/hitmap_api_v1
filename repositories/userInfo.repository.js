// const { Op } = require('sequelize');

class UserInfoRepository {
  constructor(UserModel, UserImageModel, PostModel, PostImageModel, LikeModel) {
    this.userModel = UserModel;
    this.userImageModel = UserImageModel;
    this.postModel = PostModel;
    this.postImageModel = PostImageModel;
    this.likeModel = LikeModel;
  }

  // 내 정보 조회
  findByUserId = async (user_id) => {
    const userInfo = await this.userModel.findOne({
      where: {
        user_id: user_id,
      },
      attributes: ['user_id', 'email', 'nickname', 'social'],
      include: [
        {
          model: this.userImageModel,
          attributes: ['src'],
        },
        {
          model: this.postModel,
          attributes: ['post_id'],
        },
        {
          model: this.likeModel,
          attributes: ['user_id'],
        },
      ],
    });

    return userInfo;
  };

  // 내 정보 찾기
  findUser = async (user_id) => {
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

  // 카카오 로그인 사용자의 내 정보 수정
  updateKakaoUserInfo = async (user_id, password, nickname, image) => {
    await this.userModel.update(
      {
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
    const where = {
      user_id: user_id, // lastId
    };

    // if (parseInt(lastId, 10)) {
    //   where.post_id = { [Op.lt]: parseInt(lastId, 10) }; // Op: Operater
    // }

    const all_my_posts = await this.postModel.findAll({
      where,
      // limit: 15,
      order: [['createdAt', 'DESC']],
      attributes: ['post_id', 'created_at'],
      include: [
        {
          model: this.postImageModel,
          attributes: ['src'],
        },
      ],
    });

    return {
      Posts: all_my_posts,
    };
  };

  // 회원탈퇴
  deleteUserInfo = async (user_id) => {
    const delete_user = await this.userModel.destroy({
      where: {
        user_id: user_id,
      },
    });

    return delete_user;
  };
}

module.exports = UserInfoRepository;
