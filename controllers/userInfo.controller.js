const {
  get_my_info,
  update_user_info,
  get_my_posts,
  delete_user_info,
  update_user_password,
} = require('../services/userInfo.service');

class UserInfoController {
  // 내 정보 조회
  getMyInfo = async (req, res) => {
    try {
      const user_id = res.locals.user;

      const user_info = await get_my_info(user_id);

      return res.status(200).send({
        user_id: user_info.my_info.user_id,
        email: user_info.my_info.email,
        nickname: user_info.my_info.nickname,
        my_post_length: user_info.my_info.Posts.length,
        liked_length: user_info.all_num,
        profile_image: user_info.my_info.UserImage.src,
        social: user_info.my_info.social,
      });
    } catch (error) {
      console.log(error);
      if (error.message) {
        return res.status(error.statusCode).send({
          errorMessage: error.message,
          status: error.statusCode,
        });
      }
      return res.status(400).send({
        errorMessage: '내 정보 조회에 실패하였습니다.',
      });
    }
  };

  // 내 정보 수정
  updateUserInfo = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const image = req.file?.location;
      const { nickname } = req.body;

      await update_user_info(user_id, nickname, image);

      return res.status(201).send({
        message: '회원정보 수정 완료',
      });
    } catch (error) {
      console.log(error);
      if (error.message) {
        return res.status(error.statusCode).send({
          errorMessage: error.message,
          status: error.statusCode,
        });
      }
      return res.status(400).send({
        errorMessage: '회원정보 수정에 실패하였습니다.',
      });
    }
  };

  // 내 비밀번호 수정
  updateUserPassword = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { prevPassword, password, passwordConfirm } = req.body;

      await update_user_password(user_id, prevPassword, password, passwordConfirm);

      return res.status(201).send({
        message: '비밀번호 수정 완료',
      });
    } catch (error) {
      console.log(error);
      if (error.message) {
        return res.status(error.statusCode).send({
          errorMessage: error.message,
          status: error.statusCode,
        });
      }
      return res.status(400).send({
        errorMessage: '비밀번호 수정에 실패하였습니다.',
      });
    }
  };

  // 내 게시글 조회
  getMyPosts = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { lastId } = req.query;

      const my_posts = await get_my_posts(user_id, lastId);

      return res.status(200).send({
        Posts: my_posts.Posts,
      });
    } catch (error) {
      console.log(error);
      if (error.message) {
        return res.status(error.statusCode).send({
          errorMessage: error.message,
          status: error.statusCode,
        });
      }
      return res.status(400).send({
        errorMessage: '게시글 조회에 실패했습니다.',
      });
    }
  };

  // 회원탈퇴
  deleteUserAllInfo = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { password } = req.body;

      const delete_user = await delete_user_info(user_id, password);

      if (delete_user) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
      }

      return res.status(204).send({
        message: '회원탈퇴가 정상적으로 이루졌습니다.',
        result: delete_user,
      });
    } catch (error) {
      console.log(error);
      if (error.message) {
        return res.status(error.statusCode).send({
          errorMessage: error.message,
          status: error.statusCode,
        });
      }
      return res.status(400).send({
        errorMessage: '회원탈퇴에 실패 하였습니다.',
      });
    }
  };
}

module.exports = UserInfoController;
