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
  password: Joi.string() // 8자 이상, 영어+숫자+특수문자
    .regex(RegExp(pattern))
    .min(8)
    .required()
    .messages({
      'string.pattern.base': '비밀번호는 8자 이상 문자+특수문자 조합으로 되어야합니다.',
      'string.min': 'PW BELOW STRING LENGTH 8',
      'string.required': 'NO PW INPUT',
    }),
  passwordConfirm: Joi.string() // 8자 이상, 영어+숫자+특수문자
    .regex(RegExp(pattern))
    .min(8)
    .required()
    .messages({
      'string.pattern.base': '비밀번호는 8자 이상 문자+특수문자 조합으로 되어야합니다.',
      'string.min': 'PW BELOW STRING LENGTH 8',
      'string.required': 'NO PW INPUT',
    }),
  nickname: Joi.string().pattern(new RegExp('^[a-zA-Z0-9가-힇]{2,15}$')).min(2).required().messages({
    'string.pattern.base': '닉네임은 영어/한글 + 숫자 조합이어야 합니다.',
    'string.min': 'PW BELOW STRING LENGTH 2',
    'string.required': 'NO NICKNAME INPUT',
  }), // 형식: 2자 이상, 영/한글 조합 + 숫자 / 유효성 검사 시 부적절한 언어 체크
});

/*
로그인 JOI 검증
exports.loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.pattern.base': 'WRONG email PATTERN',
      'any.required': 'NO email INPUT',
    }),

  password: Joi.string().min(4).max(20).required().messages({
    'string.empty': 'NO PW INPUT',
    'string.min': 'PW BELOW STRING LENGTH 4',
    'string.max': 'PW ABOVE STRING LENGTH 20',
    'any.required': 'NO PW INPUT',
  }),
});
*/
