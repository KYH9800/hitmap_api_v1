class UserInfoRepository {
  constructor(UserModel, UserImageModel) {
    this.userModel = UserModel;
    this.userImageModel = UserImageModel;
  }

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
}

module.exports = UserInfoRepository;
