const { Server } = require('socket.io');

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
    allowEIO3: true,
    path: '/socket.io',
  });

  const room = io.of('/room');

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
