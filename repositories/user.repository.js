class UserRepository {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  signup = (email, password, passwordConfirm, nickname, image) => {
    console.log('repo 매개변수: ', email, password, passwordConfirm, nickname, image);
  };
}

module.exports = UserRepository;
