class CheckRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }
  findByEmail = async (email) => {
    const aleady_user_email = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    return aleady_user_email;
  };

  findByNickname = async (nickname) => {
    const aleady_user_nickname = await this.userModel.findOne({
      where: {
        nickname: nickname,
      },
    });

    return aleady_user_nickname;
  };
}

module.exports = CheckRepository;
