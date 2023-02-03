const SocketService = require('../services/socket.service');
const socketService = new SocketService();

class SocketController {
  findMyRoom = async (req, res) => {
    const user_id = res.locals.user;
    console.log('userId: ', user_id);

    const find_my_rooms = await socketService.findMyRooms(user_id);
    console.log('find_my_rooms: ', find_my_rooms);

    return res.status(200).send({
      rooms: find_my_rooms,
    });
  };

  removeRoom = async (req, res) => {
    const { userId } = req.body;

    const delete_room = await socketService.removeRoom(userId);

    return res.status(200).send({
      message: '채팅방이 삭제 되었습니다.',
      rooms: delete_room,
    });
  };
}

module.exports = SocketController;
