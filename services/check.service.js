const { User } = require('../models');

const { CustomError } = require('../utils/Error');

const CheckRepository = require('../repositories/check.repository');
const checkRepository = new CheckRepository(User);

const check_user_email = async (email) => {
  const aleady_user_email = await checkRepository.findByEmail(email);

  if (aleady_user_email) {
    throw new CustomError('이미 사용중인 이메일 입니다.', 401);
  }

  return aleady_user_email;
};

const check_user_nickname = async (nickname) => {
  const aleady_user_nickname = await checkRepository.findByNickname(nickname);

  if (aleady_user_nickname) {
    throw new CustomError('이미 사용중인 닉네임 입니다.', 401);
  }

  return aleady_user_nickname;
};

module.exports = {
  check_user_email,
  check_user_nickname,
};
