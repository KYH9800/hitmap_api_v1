const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

class SocketService {
  removeRoom = async (roomId) => {
    try {
      await Room.deleteOne({ _id: roomId });
      await Chat.deleteMany({ room: roomId });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = SocketService;
