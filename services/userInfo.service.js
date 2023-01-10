const { User, UserImage } = require('../models');

const { CustomError } = require('../utils/Error');

const UserInfoRepository = require('../repositories/userInfo.repository');
const userInfoRepository = new UserInfoRepository(User, UserImage);

const bcrypt = require('bcrypt');

// 내 정보 조회
const get_my_info = async (user_id) => {
  if (!user_id) throw new CustomError('유저 정보가 존재하지 않습니다.', 412);

  const my_info = await userInfoRepository.findByUserId(user_id);
  console.log('my_info: ', my_info);

  if (!my_info) {
    throw new CustomError('유저 정보가 존재하지 않습니다.', 412);
  }

  return my_info;
};

// 내 정보 수정
const update_user_info = async (user_id, prevPassword, password, passwordConfirm, nickname, image) => {
  const find_user = await userInfoRepository.findUserPassword(user_id);
  const password_check = await bcrypt.compare(prevPassword, find_user.password);

  if (!password_check) {
    throw new CustomError('현재 비밀번호가 일치하지 않습니다.', 412);
  }

  if (password !== passwordConfirm) {
    throw new CustomError('비밀번호 확인이 일치하지 않습니다.', 412);
  }

  const hashed_password = await bcrypt.hash(password, 12);
  await userInfoRepository.updateUserInfo(user_id, hashed_password, nickname, image);
};

module.exports = {
  get_my_info,
  update_user_info,
};
