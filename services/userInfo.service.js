const { User, UserImage } = require('../models');

const { CustomError } = require('../utils/Error');

const UserInfoRepository = require('../repositories/userInfo.repository');
const userInfoRepository = new UserInfoRepository(User, UserImage);

const get_my_info = (user_id) => {
  if (!user_id) throw new CustomError('유저 정보가 존재하지 않습니다.', 412);

  const my_info = userInfoRepository.findByUserId(user_id);
  console.log('my_info: ', my_info);

  if (!my_info) {
    throw new CustomError('유저 정보가 존재하지 않습니다.', 412);
  }

  return my_info;
};

module.exports = {
  get_my_info,
};
