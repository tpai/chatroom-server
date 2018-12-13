const {
  joinChannel,
  leaveChannel,
  sendMessage,
} = require('./socket-helpers');

const sockets = (io) => (socket) => {
  console.log('User connected');
  socket.on('joinChannel', async (data) => {
    try {
      await joinChannel(data, socket, io);
    } catch (e) {
      socket.emit('error', e);
    }
  });
  socket.on('leaveChannel', async (data) => {
    try {
      await leaveChannel(data, socket, io);
    } catch (e) {
      socket.emit('error', e);
    }
  });
  socket.on('sendMessage', async (data) => {
    try {
      await sendMessage(data, socket, io);
    } catch (e) {
      socket.emit('error', e);
    }
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};

module.exports = sockets;
