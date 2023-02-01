const { Server } = require('socket.io');

const SocketService = require('../services/socket.service');
const socketService = new SocketService();

module.exports = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
    allowEIO3: true,
    path: '/socket.io',
  });

  app.set('io', io);
  const chat = io.of('/chat');

  chat.on('connection', (socket) => {
    const req = socket.request;
    console.log('req.cookies: ', req.cookies);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const {
      headers: { referer },
    } = req;
    console.log(`✔ ${ip} 클라이언트 접속, socket.id : ${socket.id}, req.ip : ${req.ip}`);

    const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/, '');

    socket.join(roomId);

    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.cookies}님이 입장하셨습니다.`,
    });

    // 연결 종료 시
    socket.on('disconnect', async () => {
      console.log('클라이언트 접속 해제', ip, socket.id, req.ip);

      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      socket.leave(roomId);

      if (userCount === 0) {
        await socketService.removeRoom(roomId);
        console.log('방 제거 요청 성공');
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });

    // 에러 시
    socket.on('error', (err) => {
      console.error(err);
    });
  });
};
