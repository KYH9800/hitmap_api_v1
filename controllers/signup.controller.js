const { user_register } = require('../services/signup.service');

const { registerSchema } = require('../validations/user.validation');

const logger = require('../config/loggers');

class SignupController {
  signup = async (req, res) => {
    try {
      const image = req.file?.location;
      const { email, password, passwordConfirm, nickname } = await registerSchema.validateAsync(req.body);

      const result = await user_register(email, password, passwordConfirm, nickname, image);

      return res.status(200).send({
        message: '회원가입 성공',
        user_data: result,
      });
    } catch (error) {
      logger.error(error.message || error);
      if (error.message) {
        return res.status(error.statusCode).send({
          errorMessage: error.message,
          status: error.statusCode,
        });
      }
      return res.status(400).send({
        errorMessage: '회원가입에 실패하였습니다.',
      });
    }
  };
}

module.exports = SignupController;
