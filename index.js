const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const fileUpload = require('express-fileupload');

const { setHeaders, handleFileUpload } = require('./src/routes');
const socketHandlers = require('./src/sockets')(io);

app.use(setHeaders);
app.use('/uploaded', express.static(path.resolve(__dirname, 'uploaded')));
app.post('/upload', fileUpload(), handleFileUpload);

io.on('connection', socketHandlers);

http.listen(3333, () => {
  console.log('listening on *:3333');
});
