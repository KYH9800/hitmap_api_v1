const { User } = require('../models');

const UserRepository = require('../repositories/user.repository');
const userRepository = new UserRepository(User);

const user_register = (email, password, passwordConfirm, nickname, image) => {
  const result = userRepository.signup(email, password, passwordConfirm, nickname, image);
  console.log('result: ', result);

  return result;
};

module.exports = {
  user_register,
};
