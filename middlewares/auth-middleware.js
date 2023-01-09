const { CustomError } = require('../utils/Error');

const { User } = require('../models');

const jwt = require('jsonwebtoken');

// Refresh Token을 검증
function validateRefreshToken(refreshToken) {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Access Token의 Payload
function getAccessTokenPayload(access_token) {
  console.log('access_token: ', access_token);
  try {
    const payload = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// refresh_token
const isLoggedIn_refresh_token = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;

    const refresh_token = req.cookies.refresh_token;

    if (!access_token) throw new CustomError('로그인된 사용자만 접근이 가능합니다.', 403);

    const access_token_invalid = getAccessTokenPayload(access_token);

    if (!access_token_invalid) {
      const refresh_token_invalid = validateRefreshToken(refresh_token);

      if (!refresh_token_invalid) return res.status(419).json({ message: 'Refresh Token이 만료되었습니다.' });

      const user = await User.findOne({
        where: {
          user_id: refresh_token_invalid.user_id,
        },
      });

      const new_access_token = jwt.sign(
        {
          user_id: user.user_id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '3s',
        },
      );
      res.locals.user = refresh_token_invalid.user_id;
      return res.cookie('access_token', new_access_token).send({ message: 'Access Token을 새롭게 발급하였습니다.' });
    } else {
      const user_information = await User.findOne({
        where: {
          user_id: access_token_invalid.user_id,
        },
      });

      res.locals.user = user_information.user_id;
      next();
    }
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(error.statusCode).send({
        errorMessage: error.message,
        status: error.statusCode,
      });
    }
    res.status(400).send({
      errorMessage: 'middleware error, 관리자에게 문의하세요',
    });
  }
};

// 로그인이 되지 않은 상태에서 접근을 막음
const isLoggedIn = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;

    const payload = getAccessTokenPayload(access_token);

    if (!payload) {
      throw new CustomError('로그인된 사용자만 접근이 가능합니다.', 403);
    }

    res.locals.user = payload.user_id;
    next();
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(error.statusCode).send({
        errorMessage: error.message,
        status: error.statusCode,
      });
    }
    res.status(400).send({
      errorMessage: 'middleware error, 관리자에게 문의하세요',
    });
  }
};

// 로그인된 상태에서 접근을 막음
const isNotLoggedIn = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;

    if (access_token) throw new CustomError('이미 로그인된 사용자입니다.', 403);

    next();
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(error.statusCode).send({
        errorMessage: error.message,
        status: error.statusCode,
      });
    }
    res.status(400).send({
      errorMessage: 'middleware error, 관리자에게 문의하세요',
    });
  }
};

module.exports = {
  isLoggedIn_refresh_token,
  isLoggedIn,
  isNotLoggedIn,
};
