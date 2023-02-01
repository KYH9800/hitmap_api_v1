const Joi = require('joi');

const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{8,}$/;
// .regex(RegExp(pattern))
exports.registerSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.pattern.base': '이메일 형식이 바르지 않습니다.',
      'any.required': 'NO email INPUT',
    }),
  password: Joi.string() // 8자 이상 16자 이하, 영어+숫자+특수문자
    .regex(RegExp(pattern))
    .min(8)
    .max(16)
    .required()
    .messages({
      'string.pattern.base': '비밀번호는 8자 이상 16자 이하 문자+특수문자 조합으로 되어야합니다.',
      'string.min': 'PW BELOW STRING LENGTH 8',
      'string.max': 'PW BELOW STRING LENGTH 16',
      'string.required': 'NO PW INPUT',
    }),
  passwordConfirm: Joi.string() // 8자 이상 16자 이하, 영어+숫자+특수문자
    .regex(RegExp(pattern))
    .min(8)
    .max(16)
    .required()
    .messages({
      'string.pattern.base': '비밀번호는 8자 이상 문자+특수문자 조합으로 되어야합니다.',
      'string.min': 'PW BELOW STRING LENGTH 8',
      'string.max': 'PW BELOW STRING LENGTH 16',
      'string.required': 'NO PW INPUT',
    }),
  nickname: Joi.string().pattern(new RegExp('^[a-zA-Z0-9가-힇]{2,15}$')).min(2).max(10).required().messages({
    'string.pattern.base': '닉네임은 영어/한글 + 숫자 조합이어야 합니다.',
    'string.min': 'PW BELOW STRING LENGTH 2',
    'string.max': 'PW BELOW STRING LENGTH 10',
    'string.required': 'NO NICKNAME INPUT',
  }), // 형식: 2자 이상, 영/한글 조합 + 숫자 / 유효성 검사 시 부적절한 언어 체크
  image: Joi.string(),
});

// 로그인 JOI 검증
exports.loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.pattern.base': '이메일 형식이 바르지 않습니다.',
      'any.required': 'NO email INPUT',
    }),
  password: Joi.string() // 8자 이상, 영어+숫자+특수문자
    .regex(RegExp(pattern))
    .min(8)
    .required()
    .messages({
      'string.pattern.base': '비밀번호는 8자 이상 문자+특수문자 조합으로 되어야합니다.',
      'string.min': 'PW BELOW STRING LENGTH 8',
      'string.required': 'NO PW INPUT',
    }),
});

// email 중복확인 검증
exports.aleadyEmailSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.pattern.base': '이메일 형식이 바르지 않습니다.',
      'any.required': '이메일이 입력되지 않았습니다.',
    }),
});

// nickname 중복확인 검증
exports.aleadyNicknameSchema = Joi.object().keys({
  nickname: Joi.string().pattern(new RegExp('^[a-zA-Z0-9가-힇]{2,15}$')).min(2).max(10).required().messages({
    'string.pattern.base': '닉네임은 영어/한글 + 숫자 조합이어야 합니다.',
    'string.min': 'PW BELOW STRING LENGTH 2',
    'string.max': 'PW BELOW STRING LENGTH 10',
    'string.required': 'NO NICKNAME INPUT',
  }),
});
