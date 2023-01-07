const { user_register } = require('../services/user.service');

class UserController {
  signup = async (req, res) => {
    const { image } = req.files;
    const { email, password, passwordConfirm, nickname } = req.body;
    const result = await user_register(email, password, passwordConfirm, nickname, image);

    return res.status(200).send({
      data: result,
    });
  };

  login = async () => {
    // todo
  };
}

module.exports = UserController;
