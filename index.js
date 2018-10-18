const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');
const fileUpload = require('express-fileupload');
const uniqid = require('uniqid');

app.use('/uploaded', express.static(path.resolve(__dirname, 'uploaded')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.post('/upload',
  fileUpload(),
  async (req, res) => {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    const files = [].concat(req.files['files[]']);
    const uploads = Array.prototype.map.call(files, (file) => {
      const ext = file.name.split('.').slice(-1);
      const filename = `${uniqid()}.${ext}`;
      return { filename, promise: file.mv(path.resolve(__dirname, 'uploaded', filename)) };
    });
    Promise.all(uploads.map(({ promise }) => promise)).then((errs) => {
      res.setHeader('Content-Type', 'application/json');

      if (errs.some(err => err)) {
        return res.status(500).send(JSON.stringify(errs));
      }
      res.send(
        JSON.stringify(
          uploads.map(({ filename }) => `http://localhost:3333/uploaded/${filename}`)
        )
      );
    });
  },
);

const {
  joinChannel,
  leaveChannel,
  sendMessage,
} = require('./src/socket-helpers');

io.on('connection', (socket) => {
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
});

http.listen(3333, () => {
  console.log('listening on *:3333');
});
