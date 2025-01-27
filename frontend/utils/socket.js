import { io } from 'socket.io-client';

// Configure socket URL based on environment
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:3001' 
    : 'https://anonymous-game.vercel.app'); // Production domain

// Create socket instance with production-ready configuration
export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000,
  path: '/socket.io' // Added explicit path for Vercel deployment
});

// Simple function to get the socket instance
export const getSocket = () => socket;

// Function to connect the socket if not already connected
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();

    // Add connection error handling
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      // You might want to show a user-friendly error message here
    });
  }
  return socket;
};

// Helper function to safely disconnect socket
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
}; 