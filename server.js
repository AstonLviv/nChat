const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

server.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


