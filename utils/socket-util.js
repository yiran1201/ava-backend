import SocketIo from 'socket.io';
import db from './cache-util';

export const connectSocket = (server) => {
  const io = SocketIo(server, {cors: {origin: '*'}});
  io.on('connection', (socket) => {
    console.log('Client connected!');

    socket.on('syncConversationsOnServer', () => {
      // broadcast to all users
      io.emit('syncConversationsOnClient', db.getConversations());
    });

    socket.on('syncConversationOnServer', (conversationId) => {
      io.emit('syncConversationOnClient', db.getConversation(conversationId));
    });

    socket.on('deleteConversationOnServer', (conversationId) => {
      io.emit('deleteConversationOnClient', conversationId);
    });
  });

  io.on('disconnect', () => console.log('User left!!'));
};
