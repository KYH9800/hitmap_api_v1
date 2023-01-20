const { User, UserImage } = require('../models');
const { CustomError } = require('../utils/Error');

const bcrypt = require('bcrypt');

const SignupRepository = require('../repositories/signup.repository');
const signupRepository = new SignupRepository(User, UserImage);

const user_register = async (email, password, passwordConfirm, nickname, image) => {
  if (!email) {
    throw new CustomError('이메일이 입력되지 않았습니다.', 412);
  }

  if (!password) {
    throw new CustomError('비밀번호가 입력되지 않았습니다.', 412);
  }

  if (!passwordConfirm) {
    throw new CustomError('비밀번호 확인란이 입력되지 않았습니다.', 412);
  }

  if (!nickname) {
    throw new CustomError('닉네임이 입력되지 않았습니다.', 412);
  }

  if (password !== passwordConfirm) {
    throw new CustomError('입력한 비밀번호가 일치하지 않습니다.', 412);
  }

  if (!image) {
    image = 'https://koyunhyeok.shop/userImage/images/user_logo.png';
  }

  const hashed_password = await bcrypt.hash(password, 12);

  const result = signupRepository.signup(email, hashed_password, nickname, image);

  return result;
};

module.exports = {
  user_register,
};
