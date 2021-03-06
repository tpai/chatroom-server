const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const fileUpload = require('express-fileupload');

const { setHeaders, handleFileUpload } = require('./src/routes');
const socketHandlers = require('./src/sockets')(io);
const db = require('./src/sequelize');

app.use(setHeaders);
app.use('/uploaded', express.static(path.resolve(__dirname, 'uploaded')));
app.post('/upload', fileUpload(), handleFileUpload);

io.on('connection', socketHandlers);

db.sequelize.sync().then(() => {
  console.log('Database sync complete!');
});

http.listen(3333, () => {
  console.log('Listening on *:3333');
});
