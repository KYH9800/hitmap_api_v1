const { user_login } = require('../services/login.service');

class LoginController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const { access_token, refresh_token, nickname } = await user_login(email, password);

      if (process.env.NODE_ENV === 'production') {
        res.cookie('access_token', access_token, { sameSite: 'None', secure: false, httpOnly: true });
        res.cookie('refresh_token', refresh_token, { sameSite: 'None', secure: false, httpOnly: true });
      } else {
        res.cookie('access_token', access_token);
        res.cookie('refresh_token', refresh_token);
      }

      return res.status(200).send({
        message: '로그인 성공',
        access_token: access_token,
        refresh_token: refresh_token,
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

  logout = (req, res) => {
    try {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');

      return res.status(204).send({
        message: '로그아웃 완료',
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
        errorMessage: '로그아웃에 실패하였습니다.',
      });
    }
  };
}

module.exports = LoginController;
