import SocketIo from 'socket.io';
import db from './cache-util';

export const connectSocket = (server) => {
  const io = SocketIo(server, {cors: {origin: '*'}});
  io.on('connection', (socket) => {
    console.log('Client connected!');

    socket.on('syncConversations', () => {
      // broadcast to all users
      io.emit('retrieveConversations', db.getConversations());
    });

    socket.on('syncConversation', (conversationId) => {
      io.emit('updateConversation', db.getConversation(conversationId));
    });

    socket.on('deleteConversation', (conversationId) => {
      io.emit('clearConversation', conversationId);
    });
  });

  io.on('disconnect', () => console.log('User left!!'));
};
