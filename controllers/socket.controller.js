const SocketService = require('../services/socket.service');
const socketService = new SocketService();

class SocketController {
  createChat = async (req, res) => {
    const { roomId, userId, userImage, userName, message } = req.body;
    const chat = await socketService.createChat(roomId, userId, userImage, userName, message);

    return res.status(200).send({
      message: '채팅 내역 저장',
      success_data: chat,
    });
  };

  findAllChat = async (req, res) => {
    const { guestId } = req.body;
    const userId = res.locals.user;

    const findAllChat = await socketService.findAllChat(guestId, userId);

    return res.status(200).send({
      data: findAllChat,
    });
  };

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
