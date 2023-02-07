class FollowRepository {
  constructor(UserModel, FollowModel) {
    this.userModel = UserModel;
    this.followModel = FollowModel;
  }

  createFollow = async (user_id, interest_user_id) => {
    const isFollow = await this.followModel.findAll({ where: { user_id, interest_user_id } });

    if (!isFollow.length) {
      await this.followModel.create({
        user_id,
        interest_user_id,
      });
      return { message: '팔로우' };
    } else {
      await this.followModel.destroy({
        where: {
          user_id,
          interest_user_id,
        },
      });
      return { message: '팔로우 취소' };
    }
  };
}

module.exports = FollowRepository;
