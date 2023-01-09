const { user_login } = require('../services/login.service');

class LoginController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const { access_token, refresh_token, nickname } = await user_login(email, password);

      res.cookie('access_token', access_token);
      res.cookie('refresh_token', refresh_token);

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
    const user = res.locals.user;
    console.log('logout res.locals: ', res.locals);
    console.log('logout user: ', user);
    const access_token = req.cookies.access_token;
    console.log('access_token: ', access_token);
    const refresh_token = req.cookies.refresh_token;
    console.log('refresh_token: ', refresh_token);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.send({
      message: '로그아웃 완료',
    });
  };
}

module.exports = LoginController;
