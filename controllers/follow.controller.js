const { create_follow } = require('../services/follow.service');

class FollowController {
  createFollow = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { interestUserId } = req.params;

      const follow = await create_follow(user_id, interestUserId);

      res.status(200).json({ follow });
    } catch (error) {
      console.log(error);
      if (error.code) {
        return res.status(error.code).json({ errorMessage: error.errorMessage });
      } else {
        return res.status(400).json({ errorMessage: '게시글 작성에 실패 했습니다.' });
      }
    }
  };
}

module.exports = FollowController;
