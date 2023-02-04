const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

class SocketService {
  createChat = async (roomId, userId, guestId, userImage, userName, message) => {
    const chat = Chat.create({
      roomId: roomId,
      userId: userId,
      guestId: guestId,
      userImage: userImage,
      userName: userName,
      chat: message,
    });

    return chat;
  };

  findAllChat = async (guestId, userId) => {
    const allChat = Chat.find({
      guestId: userId,
      userId: guestId,
    });

    return allChat;
  };

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
      guestId: userId,
    });

    return rooms;
  };

  findRoom = async (userId, guestId) => {
    const findRoom = Room.find({
      userId: userId,
      guestId: guestId,
    });

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
