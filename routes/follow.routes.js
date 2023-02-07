const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth-middleware');

const FollowController = require('../controllers/follow.controller');

const followController = new FollowController();

router.patch('/:interestUserId', auth.is_logged_in_refresh_token, followController.createFollow);

module.exports = router;
