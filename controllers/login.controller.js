const { user_login } = require('../services/login.service');
const {
  get_kakao_tokens,
  get_user_info,
  make_token_after_check_user_info,
} = require('../services/kakao_login.service');

class LoginController {
  // 일반 로그인
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

  // 일반 로그아웃
  logout = async (req, res) => {
    try {
      await res.clearCookie('access_token');
      await res.clearCookie('refresh_token');

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

  // 카카오 로그인
  startKakaoLogin = async (req, res) => {
    try {
      const { code } = req.query;
      console.log('code: ', code);

      // token 발급
      const authToken = await get_kakao_tokens(code);

      // 회원정보 가져오기
      const user_data = await get_user_info(authToken);
      console.log('user_data: ', user_data);

      // 인증 완료 후 회원정보 바탕으로 token 발행
      const { access_token, refresh_token, nickname } = await make_token_after_check_user_info(user_data);
      console.log('access_token: ', access_token);
      console.log('refresh_token: ', refresh_token);
      console.log('nickname: ', nickname);

      if (process.env.NODE_ENV === 'production') {
        // 배포 시 메인 홈 화면으로 리다이렉트
        return res.redirect('https://hitmap-fe.vercel.app');
      } else {
        // 개발할 때는 로컬에서의 테스트 화면
        return res.redirect(
          `http://localhost:3000/?access_token=${access_token}&refresh_token=${refresh_token}&nickname=${nickname}`,
        );
      }
    } catch (error) {
      if (error.message) {
        console.log('error: ', error);
        // 리다이렉트 시켜줘야함!!
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

  // 카카오 로그인 jwt 토큰 생성
  make_jwt_using_kakao_token = async (req, res) => {
    try {
      const { access_token, refresh_token, nickname } = req.body;
      console.log('access_token: ', access_token);
      console.log('refresh_token: ', refresh_token);
      console.log('nickname: ', nickname);

      if (process.env.NODE_ENV === 'production') {
        res.cookie('access_token', access_token, { sameSite: 'None', secure: false, httpOnly: true });
        res.cookie('refresh_token', refresh_token, { sameSite: 'None', secure: false, httpOnly: true });
      } else {
        res.cookie('access_token', access_token);
        res.cookie('refresh_token', refresh_token);
      }

      res.status(200).send({
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
}

module.exports = LoginController;
