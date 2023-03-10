const { CustomError } = require('../utils/Error');

const { User } = require('../models');

const jwt = require('jsonwebtoken');

// Refresh Token을 검증
function validate_refresh_token(refreshToken) {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Access Token의 Payload
function get_access_token_payload(access_token) {
  try {
    const payload = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// refresh_token
const is_logged_in_refresh_token = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;

    if (!access_token) throw new CustomError('로그인된 사용자만 접근이 가능합니다.', 403);

    const access_token_invalid = get_access_token_payload(access_token);
    const refresh_token_invalid = validate_refresh_token(refresh_token);

    if (!refresh_token_invalid) {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      throw new CustomError('refresh-token이 만료되었습니다. 다시 로그인 하세요.', 419);
    }

    if (!access_token_invalid) {
      const refresh_token_invalid = validate_refresh_token(refresh_token);

      if (!refresh_token_invalid) {
        throw new CustomError('Refresh Token이 만료되었습니다.', 419);
      }

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
          expiresIn: '1h',
        },
      );
      res.locals.user = refresh_token_invalid.user_id;

      if (process.env.NODE_ENV === 'production') {
        res.cookie('access_token', new_access_token, { sameSite: 'None', secure: true, httpOnly: true });
      } else {
        res.cookie('access_token', new_access_token);
      }

      throw new CustomError('access-token이 만료되어 재발급합니다.', 419);
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

// 로그인이 되지 않은 상태에서 접근을 막음 / 로그아웃
const is_logged_in = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      throw new CustomError('로그인된 사용자만 접근이 가능합니다.', 403);
    }

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
const is_not_logged_in = async (req, res, next) => {
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

// 로그인된 유저의 정보를 확인
const check_logged_in_user = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;

    if (access_token) {
      const payload = get_access_token_payload(access_token);

      if (!payload) {
        return next();
      } else {
        const user_information = await User.findOne({
          where: {
            user_id: payload.user_id,
          },
        });
        res.locals.user = user_information.user_id;
        return next();
      }
    } else {
      res.locals.user = null;
      return next();
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

module.exports = {
  is_logged_in_refresh_token,
  is_logged_in,
  is_not_logged_in,
  check_logged_in_user,
};
