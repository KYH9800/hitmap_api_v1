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

  let likesArr = [];
  my_info.Posts.map((post) => {
    return likesArr.push(post.Likes.length);
  });

  let all_num = 0;
  likesArr.forEach((num) => {
    all_num += num;
  });

  return {
    my_info: my_info,
    all_num: all_num,
  };
};

// 내 정보 수정
const update_user_info = async (user_id, nickname, image) => {
  if (nickname) {
    await userInfoRepository.updateUserNickname(user_id, nickname);
  }
  if (image) {
    await userInfoRepository.updateUserImage(user_id, image);
  }
};

// 내 비밀번호 수정
const update_user_password = async (user_id, prevPassword, password, passwordConfirm) => {
  const find_user = await userInfoRepository.findUser(user_id);
  const social_user_number = parseInt(find_user.social);

  if (social_user_number) {
    throw new CustomError('카카오 로그인에는 제공되지 않는 기능입니다.', 403);
  }

  if (!prevPassword || !password || !passwordConfirm) {
    throw new CustomError('변경할 비밀번호를 입력해 주세요.', 412);
  } else {
    const password_check = await bcrypt.compare(prevPassword, find_user.password);

    if (!password_check) {
      throw new CustomError('현재 비밀번호가 일치하지 않습니다.', 412);
    }

    if (password !== passwordConfirm) {
      throw new CustomError('비밀번호 확인이 일치하지 않습니다.', 412);
    }
    const hashed_password = await bcrypt.hash(password, 12);

    await userInfoRepository.updateUserPassword(user_id, hashed_password);
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

  if (parseInt(find_user.social)) {
    // 카카오 로그인된 사용자
    if (password) {
      throw new CustomError('카카오 로그인은 비밀번호가 필요하지 않습니다.', 412);
    }

    const delete_user = await userInfoRepository.deleteUserInfo(user_id);

    return delete_user;
  } else {
    // 일반 사용자
    if (!password) {
      throw new CustomError('비밀번호가 입력되지 않았습니다.', 412);
    }

    const password_check = await bcrypt.compare(password, find_user.password);

    if (!password_check) {
      throw new CustomError('비밀번호가 일치하지 않습니다.', 412);
    } else {
      const delete_user = await userInfoRepository.deleteUserInfo(user_id);

      return delete_user;
    }
  }
};

module.exports = {
  get_my_info,
  update_user_info,
  update_user_password,
  get_my_posts,
  delete_user_info,
};
