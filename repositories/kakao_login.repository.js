// const { CustomError } = require('../utils/Error');

class KaKaoSignupRepository {
  constructor(UserModel, UserImageModel) {
    this.userModel = UserModel;
    this.userImageModel = UserImageModel;
  }

  // 이메일 존재 여부 파악
  findByEmail = async (email) => {
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    return user;
  };

  // 테이블에 없으면 자동으로 회원가입(DB에 저장)
  autoSocialSignup = async (email, nickname, profile_image) => {
    const auto_signup_kakao_user = await this.userModel.create({
      email: email,
      nickname: nickname,
      social: 1, // 카카오 로그인 통한 User
    });

    const auto_signup_kakao_user_image = await this.userImageModel.create({
      src: profile_image,
      user_id: auto_signup_kakao_user.user_id,
    });

    return {
      user_id: auto_signup_kakao_user.user_id,
      email: auto_signup_kakao_user.email,
      nickname: auto_signup_kakao_user.nickname,
      profile_image: auto_signup_kakao_user_image.src,
    };
  };
}

module.exports = KaKaoSignupRepository;
