const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for testing
    },
});

// In-memory storage for rooms
const rooms = {};

// Helper function to generate random pseudonyms
function generatePseudonym() {
    const adjectives = ['Brave', 'Clever', 'Silent', 'Mysterious', 'Swift'];
    const nouns = ['Fox', 'Eagle', 'Wolf', 'Owl', 'Panther'];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

// Handle socket connections
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle room join/create
    socket.on('joinRoom', ({ roomId, isHost, limit }) => {
        // Check if room exists or create a new one
        if (!rooms[roomId]) {
            if (!isHost) {
                socket.emit('error', 'Room does not exist.');
                return;
            }
            // Create room if host
            rooms[roomId] = {
                host: socket.id,
                participants: [],
                limit: limit || Infinity,
                messages: [],
            };
            console.log(`Room created: ${roomId} by host: ${socket.id}`);
        }

        const room = rooms[roomId];

        // Check if room is full
        if (room.participants.length >= room.limit) {
            socket.emit('error', 'Room is full.');
            return;
        }

        // Assign pseudonym and join room
        const pseudonym = generatePseudonym();
        room.participants.push({ id: socket.id, pseudonym });
        socket.join(roomId);

        // Notify the client and update participants
        socket.emit('roomJoined', { roomId, pseudonym });
        io.to(roomId).emit('participantsUpdated', room.participants);

        console.log(`Client ${socket.id} joined room: ${roomId}`);
    });

    // Handle message sending
    socket.on('sendMessage', ({ roomId, message }) => {
        const room = rooms[roomId];
        if (room) {
            room.messages.push({ id: socket.id, message });
            console.log(`Message received in room ${roomId}: ${message}`);
        }
    });

    // Handle next message retrieval
    socket.on('nextMessage', (roomId) => {
        const room = rooms[roomId];
        if (room && room.messages.length > 0) {
            const randomIndex = Math.floor(Math.random() * room.messages.length);
            const randomMessage = room.messages.splice(randomIndex, 1)[0];
            io.to(roomId).emit('displayMessage', randomMessage);
            console.log(`Random message sent in room ${roomId}: ${randomMessage.message}`);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        Object.keys(rooms).forEach((roomId) => {
            const room = rooms[roomId];
            room.participants = room.participants.filter((p) => p.id !== socket.id);
            if (room.host === socket.id) {
                io.to(roomId).emit('roomClosed');
                delete rooms[roomId];
                console.log(`Room closed: ${roomId}`);
            } else {
                io.to(roomId).emit('participantsUpdated', room.participants);
            }
        });
    });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
