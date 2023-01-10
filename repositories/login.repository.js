class LoginRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  findByEmail = async (email) => {
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    return user;
  };
}

module.exports = LoginRepository;
