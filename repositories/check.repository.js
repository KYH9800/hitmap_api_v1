class CheckRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }
  findByEmail = async (email) => {
    const aleady_user_email = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    return aleady_user_email;
  };
}

module.exports = CheckRepository;
