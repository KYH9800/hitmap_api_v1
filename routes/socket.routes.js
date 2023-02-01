const express = require('express');
const router = express.Router();

// const auth = require('../../middlewares/auth-middleware');

const SocketController = require('../controllers/socket.controller');
const socketController = new SocketController();

// domain/direct
router.post('/room', socketController.test); // 채팅방 생성
router.delete('/room', socketController.test); // 채팅방 제거

module.exports = router;
