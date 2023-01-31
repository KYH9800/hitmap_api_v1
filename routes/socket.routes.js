const express = require('express');
const router = express.Router();

// const auth = require('../../middlewares/auth-middleware');

const SocketController = require('../controllers/socket.controller');
const socketController = new SocketController();

// domain/message
router.post('/', socketController.test);

module.exports = router;
