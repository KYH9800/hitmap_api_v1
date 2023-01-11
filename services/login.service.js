const { User } = require('../models');

const LoginRepository = require('../repositories/login.repository');
const loginRepository = new LoginRepository(User);
// custom error
const { CustomError } = require('../utils/Error');
// jwt, bcrypt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 로그인 함수
const user_login = async (email, password) => {
  const user = await loginRepository.findByEmail(email);

  const compare_password = await bcrypt.compare(password, user.password);

  if (!user) {
    throw new CustomError('이메일 또는 비밀번호를 확인해주세요.', 412);
  }

  if (!compare_password) {
    throw new CustomError('이메일 또는 비밀번호를 확인해주세요.', 412);
  }

  const access_token = jwt.sign(
    {
      user_id: user.user_id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1h',
    },
  );

  const refresh_token = jwt.sign(
    {
      user_id: user.user_id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1d',
    },
  );

  return {
    access_token: access_token,
    refresh_token: refresh_token,
    nickname: user.nickname,
  };
};

module.exports = {
  user_login,
};
