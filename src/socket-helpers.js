const {
  getUsers,
  getMessages,
  sendMessage,
} = require('./mysql');

const helpers = {
  joinChannel: async ({ id, username }, socket, io) => {
    return new Promise((resolve, reject) => {
      socket.join(`channel${id}`, async () => {
        try {
          await helpers.reloadChannel(id, io);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  },
  leaveChannel: async ({ id }, socket, io) => {
    return new Promise((resolve, reject) => {
      socket.leave(`channel${id}`, async () => {
        try {
          await helpers.reloadChannel(id, io);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  },
  reloadChannel: async (id, io) => {
    const users = await new Promise((resolve, reject) => {
      io.in(`channel${id}`).clients((err, clients) => {
        if (err) reject(err);
        else resolve(clients);
      });
    });
    const messages = await getMessages(id);
    io.in(`channel${id}`).emit('getUsers', users);
    io.in(`channel${id}`).emit('getMessages', messages);
  },
  sendMessage: async (data, socket, io) => {
    const { channelId } = data;
    await sendMessage(data);
    await helpers.reloadChannel(channelId, io);
  },
};

module.exports = helpers;
