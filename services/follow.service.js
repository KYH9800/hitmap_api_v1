const FollowRepository = require('../repositories/follow.repository');

const { User, Follow } = require('../models');

const followRepository = new FollowRepository(User, Follow);

const create_follow = async (user_id, interest_user_id) => {
  const createFollow = await followRepository.createFollow(user_id, interest_user_id);

  return createFollow;
};

module.exports = {
  create_follow,
};
