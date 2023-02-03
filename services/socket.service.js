const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

class SocketService {
  createRoom = async (roomId, userId, guestId, userImage, userName, content) => {
    console.log('roomId: ', roomId);
    console.log('userId: ', userId);
    console.log('guestId: ', guestId);
    console.log('userImage: ', userImage);
    console.log('userName: ', userName);
    console.log('content: ', content);

    const room = Room.create({
      roomId: roomId,
      userId: userId,
      guestId: guestId,
      userImage: userImage,
      userName: userName,
      content: content,
    });
    console.log('room: ', room);
  };

  findMyRooms = async (userId) => {
    const rooms = Room.find({
      roomId: userId,
    });

    return rooms;
  };

  findRoom = async (roomId) => {
    const findRoom = Room.find({ roomId: roomId });

    return findRoom;
  };

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
