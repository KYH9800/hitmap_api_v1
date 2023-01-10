const { CustomError } = require('../utils/Error');

class LoginRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  findByEmail = async (email) => {
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new CustomError('이메일 또는 비밀번호를 확인해주세요.', 412);
    }

    return user;
  };
}

module.exports = LoginRepository;
