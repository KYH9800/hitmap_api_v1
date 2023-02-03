const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth-middleware');

const SocketController = require('../controllers/socket.controller');
const socketController = new SocketController();

// domain/direct
router.get('/room', auth.is_logged_in_refresh_token, socketController.findMyRoom); // 채팅방 조회
router.delete('/room', socketController.removeRoom); // 채팅방 제거

module.exports = router;
