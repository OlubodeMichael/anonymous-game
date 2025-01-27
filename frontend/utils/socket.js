import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const socket = io(SOCKET_URL, {
  autoConnect: false
});

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      transports: ['websocket'],
    });
  }
  return socket;
};

export const getSocket = () => socket; 