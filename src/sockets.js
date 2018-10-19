const {
  joinChannel,
  leaveChannel,
  sendMessage,
} = require('./socket-helpers');

const sockets = (io) => (socket) => {
  console.log('a user connected');
  socket.on('joinChannel', async (data) => {
    try {
      await joinChannel(data, socket, io);
    } catch (e) {
      socket.emit('Error', e);
    }
  });
  socket.on('leaveChannel', async (data) => {
    try {
      await leaveChannel(data, socket, io);
    } catch (e) {
      socket.emit('Error', e);
    }
  });
  socket.on('sendMessage', async (data) => {
    try {
      await sendMessage(data, socket, io);
    } catch (e) {
      socket.emit('Error', e);
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};

module.exports = sockets;
