const { get_my_info, update_user_info } = require('../services/userInfo.service');

class UserInfoController {
  // 내 정보 조회
  getMyInfo = async (req, res) => {
    try {
      const { user_id } = res.locals;

      const user_info = await get_my_info(user_id);
      console.log('user_info: ', user_info);

      return res.status(200).send({
        user_id: user_info.user_id,
        email: user_info.email,
        nickname: user_info.nickname,
        profile_image: user_info.UserImage.src,
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
      // const { user_id } = res.locals;
      const user_id = 17;
      const image = req.file?.location;
      const { prevPassword, password, passwordConfirm, nickname } = req.body;

      await update_user_info(user_id, prevPassword, password, passwordConfirm, nickname, image);

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
}

module.exports = UserInfoController;
