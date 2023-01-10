const { get_my_info } = require('../services/userInfo.service');

class UserInfoController {
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
}

module.exports = UserInfoController;
