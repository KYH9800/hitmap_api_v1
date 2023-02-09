const { CustomError } = require('../utils/Error');

class SignupRepository {
  constructor(UserModel, UserImageModel) {
    this.userModel = UserModel;
    this.userImageModel = UserImageModel;
  }

  signup = async (email, password, nickname, image) => {
    const aleadyUser = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    const aleadyUserNickname = await this.userModel.findOne({
      where: {
        nickname: nickname,
      },
    });

    if (aleadyUser) {
      throw new CustomError('이미 사용중인 이메일 입니다.', 401);
    }

    if (aleadyUserNickname) {
      throw new CustomError('이미 사용중인 닉네임 입니다.', 401);
    }

    const user = await this.userModel.create({
      email: email,
      password: password,
      nickname: nickname,
      social: 0, // 서비스 내에 일반 User
    });

    const userProfileImage = await this.userImageModel.create({
      src: image.replace(/\/original\//, '/thumb/'),
      user_id: user.user_id,
    });

    return {
      user_id: user.user_id,
      email: user.email,
      nickname: user.nickname,
      profile_image: userProfileImage.src,
    };
  };
}

module.exports = SignupRepository;
