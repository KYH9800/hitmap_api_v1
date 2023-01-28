const { User, UserImage } = require('../models');

const KaKaoSignupRepository = require('../repositories/kakao_login.repository');
const kaKaoSignupRepository = new KaKaoSignupRepository(User, UserImage);

const axios = require('axios');
const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils/Error');

// token 발급
const get_kakao_tokens = async (code) => {
  const KAKAO_OAUTH_TOKEN_API_URL = 'https://kauth.kakao.com/oauth/token';
  const grant_type = 'authorization_code';
  const client_id = process.env.NODE_ENV === 'production' ? process.env.REST_API_KEY : process.env.DEV_REST_API_KEY; // '8806104a1e87ed8c264c1ea546a4eaa9'
  const redirect_uri = process.env.NODE_ENV === 'production' ? process.env.REDIRECT_URL : process.env.DEV_REDIRECT_URL; // 'http://localhost:3065/user/kakaoLogin/start'
  try {
    const authToken = await axios
      .post(
        `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((res) => {
        return {
          access_token: res.data['access_token'],
          refresh_token: res.data['refresh_token'],
        };
      })
      .catch((error) => {
        console.log('error: ', error);
      });

    return authToken;
  } catch (error) {
    console.log(error);
  }
};

// 회원정보 가져오기
const get_user_info = async (authToken) => {
  if (!authToken) {
    throw new CustomError(
      'KOE320: 동일한 인가 코드를 두 번 이상 사용하거나, 이미 만료된 인가 코드를 사용한 경우, 혹은 인가 코드를 찾을 수 없습니다.',
      320,
    );
  }

  const user_data = await axios
    .get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken.access_token}`,
      },
    })
    .then((res) => {
      // console.log('회원정보: ', res.data.properties);
      const { nickname, profile_image } = res.data.properties;
      const { email } = res.data.kakao_account;

      return {
        email: email,
        nickname: nickname,
        profile_image: profile_image,
      };
    })
    .catch((err) => {
      console.log('회원정보 err: ', err);
    });

  return user_data;
};

// 인증 완료 후 token 발행
const make_token_after_check_user_info = async (user_data) => {
  const email = user_data.email;
  const nickname = user_data.nickname;
  const profile_image = user_data.profile_image;

  const find_user = await kaKaoSignupRepository.findByEmail(email);

  if (!find_user) {
    await kaKaoSignupRepository.autoSocialSignup(email, nickname, profile_image);
  }

  const user = await kaKaoSignupRepository.findByEmail(email);

  const access_token = jwt.sign(
    {
      user_id: user.user_id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1h',
    },
  );

  const refresh_token = jwt.sign(
    {
      user_id: user.user_id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1d',
    },
  );

  return {
    access_token: access_token,
    refresh_token: refresh_token,
    nickname: user.nickname,
  };
};

module.exports = {
  get_user_info,
  get_kakao_tokens,
  make_token_after_check_user_info,
};
