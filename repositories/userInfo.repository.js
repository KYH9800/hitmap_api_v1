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
          include: [
            {
              model: this.likeModel,
            },
          ],
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

  // 내 정보 닉네임 수정
  updateUserNickname = async (user_id, nickname) => {
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
  };

  // 내 정보 이미지 수정
  updateUserImage = async (user_id, image) => {
    await this.userImageModel.update(
      {
        src: image.replace(/\/original\//, '/thumb/'),
      },
      {
        where: {
          user_id: user_id,
        },
      },
    );
  };

  // 내 비밀번호 수정
  updateUserPassword = async (user_id, password) => {
    if (password) {
      await this.userModel.update(
        {
          password: password,
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
