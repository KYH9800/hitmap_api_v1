const { user_login } = require('../services/login.service');

class LoginController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const { token, nickname } = await user_login(email, password);

      return res.status(200).send({
        message: '로그인 성공',
        token: token,
        nickname: nickname,
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
        errorMessage: '로그인에 실패하였습니다.',
      });
    }
  };
}

module.exports = LoginController;
