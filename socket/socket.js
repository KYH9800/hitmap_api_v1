const { Server } = require('socket.io');

const SocketService = require('../services/socket.service');
const socketService = new SocketService();

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
    allowEIO3: true,
    path: '/socket.io',
  });

  const chat = io.of('/chat');
  const room = io.of('/room');

  // chat
  chat.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`✔ ${ip} 클라이언트 접속, socket.id : ${socket.id}, req.ip : ${req.ip}`);

    socket.on('join', async (data) => {
      try {
        const { roomId } = data;

        socket.emit('guestId', roomId);

        socket.join(roomId);
      } catch (err) {
        socket.emit('error', 'join 이벤트 실패');
      }
    });

    socket.on('new_message', async (msg) => {
      const { roomId, userId, guestId, userImage, userName, content } = msg;

      const findRoom = await socketService.findRoom(roomId);
      console.log('roomId: ', roomId);

      if (findRoom.length === 0) {
        await socketService.createRoom(roomId, userId, guestId, userImage, userName, content);
        await socketService.createRoom(userId, userId, guestId, userImage, userName, content);
      }

      chat.emit('new_message', content);
    });

    // 연결 종료 시
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id, req.ip);
    });

    // 에러 시
    socket.on('error', (err) => {
      console.error(err);
    });
  });

  // room
  room.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`✔ ${ip} 클라이언트 접속, socket.id : ${socket.id}, req.ip : ${req.ip}`);

    // 연결 종료 시
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id, req.ip);
    });

    // 에러 시
    socket.on('error', (err) => {
      console.error(err);
    });

    socket.on('new_message', (msg) => {
      console.log('msg: ', msg);
      // room.emit('new_message', msg);
    });

    socket.on('reply', (data) => {
      console.log('data: ', data);
    });
  });
};
