const { CustomError } = require('../utils/Error');

class SignupRepository {
  constructor(UserModel, UserImageModel) {
    this.userModel = UserModel;
    this.userImageModel = UserImageModel;
  }
  // TODO: 받아온 정보 DB에 저장만 하면됨
  signup = async (email, password, nickname, image) => {
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('nickname: ', nickname);
    console.log('image: ', image);

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
    });

    const userProfileImage = await this.userImageModel.create({
      src: image,
    });

    return { user, userProfileImage };
  };
}

module.exports = SignupRepository;
