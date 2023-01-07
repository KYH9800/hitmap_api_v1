const { user_register } = require('../services/signup.service');

const { registerSchema } = require('../validations/user.validation');

class SignupController {
  signup = async (req, res) => {
    try {
      const image = req.file?.location;
      const { email, password, passwordConfirm, nickname } = await registerSchema.validateAsync(req.body);

      const result = await user_register(email, password, passwordConfirm, nickname, image);

      return res.status(200).send({
        message: '회원가입 성공',
        user: result.user,
        userProfileImage: result.userProfileImage,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        errorMessage: '회원가입에 실패하였습니다.',
      });
    }
  };

  login = async () => {
    // todo
  };
}

module.exports = SignupController;
