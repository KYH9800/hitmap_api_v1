const { User, UserImage, Post, PostImage, Like } = require('../models');

const { CustomError } = require('../utils/Error');

const UserInfoRepository = require('../repositories/userInfo.repository');
const userInfoRepository = new UserInfoRepository(User, UserImage, Post, PostImage, Like);

const bcrypt = require('bcrypt');

// 내 정보 조회
const get_my_info = async (user_id) => {
  if (!user_id) throw new CustomError('로그인된 사용자가 아닙니다.', 412);

  const my_info = await userInfoRepository.findByUserId(user_id);

  if (!my_info) {
    throw new CustomError('유저 정보가 존재하지 않습니다.', 412);
  }

  return my_info;
};

// 내 정보 수정
const update_user_info = async (user_id, prevPassword, password, passwordConfirm, nickname, image) => {
  const find_user = await userInfoRepository.findUser(user_id);
  const password_check = await bcrypt.compare(prevPassword, find_user.password);

  if (find_user.social) {
    // 카카오 로그인된 사용자
    await userInfoRepository.updateKakaoUserInfo(user_id, nickname, image);
  } else {
    // 일반 사용자
    if (!password_check) {
      throw new CustomError('현재 비밀번호가 일치하지 않습니다.', 412);
    }

    if (password !== passwordConfirm) {
      throw new CustomError('비밀번호 확인이 일치하지 않습니다.', 412);
    }

    const hashed_password = await bcrypt.hash(password, 12);
    await userInfoRepository.updateUserInfo(user_id, hashed_password, nickname, image);
  }
};

// 내 게시글 조회
const get_my_posts = async (user_id, lastId) => {
  const my_posts = await userInfoRepository.findMyPosts(user_id, lastId);

  if (!my_posts) {
    throw new CustomError('게시글이 존재하지 않습니다.', 404);
  }

  return my_posts;
};

// 회원 탈퇴
const delete_user_info = async (user_id, password) => {
  if (!user_id) {
    throw new CustomError('로그인된 사용자가 아닙니다.', 412);
  }

  const find_user = await userInfoRepository.findUser(user_id);

  if (find_user.social) {
    // 카카오 로그인된 사용자
    const delete_user = await userInfoRepository.deleteUserInfo(user_id);

    return delete_user;
  } else {
    // 일반 사용자
    const password_check = await bcrypt.compare(password, find_user.password);

    if (!password_check) {
      throw new CustomError('비밀번호가 일치하지 않습니다.', 412);
    }

    const delete_user = await userInfoRepository.deleteUserInfo(user_id);

    return delete_user;
  }
};

module.exports = {
  get_my_info,
  update_user_info,
  get_my_posts,
  delete_user_info,
};
