const { check_user_email } = require('../services/check.service');

const { aleadyEmailSchema } = require('../validations/user.validation');

class CheckController {
  findByEmail = async (req, res) => {
    try {
      const { email } = await aleadyEmailSchema.validateAsync(req.body);

      await check_user_email(email);

      return res.status(200).send({
        message: '사용 가능한 이메일 입니다.',
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
        errorMessage: '중복확인에 실패했습니다.',
      });
    }
  };
}

module.exports = CheckController;
