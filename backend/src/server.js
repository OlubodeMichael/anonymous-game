const WebSocket = require('ws');
const http = require('http');
const { generateRoomCode, validateRoomCode } = require('./utils');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Store rooms and their data
const rooms = new Map();

// Store client information
const clients = new Map();

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (data) => {
        const message = JSON.parse(data);

        switch (message.type) {
            case 'createRoom': {
                const { userName, roomName } = message.payload;
                const roomCode = generateRoomCode();
                
                rooms.set(roomCode, {
                    name: roomName,
                    host: ws,
                    messages: [],
                    users: new Set([userName]),
                    createdAt: Date.now()
                });

                clients.set(ws, { roomCode, userName, isHost: true });
                
                ws.send(JSON.stringify({
                    type: 'roomCreated',
                    payload: { roomCode, userName }
                }));
                break;
            }

            case 'joinRoom': {
                const { roomCode, userName } = message.payload;
                const room = rooms.get(roomCode);

                if (!room) {
                    ws.send(JSON.stringify({
                        type: 'error',
                        payload: { message: 'Room not found' }
                    }));
                    return;
                }

                room.users.add(userName);
                clients.set(ws, { roomCode, userName, isHost: false });

                // Notify all users in the room about the new user
                broadcastToRoom(roomCode, {
                    type: 'userJoined',
                    payload: { userName, message: `${userName} has joined the room` }
                });

                // Send current room state to the new user
                ws.send(JSON.stringify({
                    type: 'roomJoined',
                    payload: {
                        roomCode,
                        users: Array.from(room.users),
                        messages: room.messages
                    }
                }));
                break;
            }

            case 'sendMessage': {
                const { message: messageText } = message.payload;
                const client = clients.get(ws);
                
                if (!client) return;

                const room = rooms.get(client.roomCode);
                if (!room) return;

                const newMessage = {
                    id: Date.now(),
                    userName: client.userName,
                    message: messageText,
                    timestamp: Date.now()
                };

                room.messages.push(newMessage);

                broadcastToRoom(client.roomCode, {
                    type: 'messageAdded',
                    payload: { message: newMessage }
                });
                break;
            }

            case 'nextMessage': {
                const client = clients.get(ws);
                if (!client || !client.isHost) return;

                const room = rooms.get(client.roomCode);
                if (!room || room.messages.length === 0) return;

                // Select random message and remove it from the queue
                const randomIndex = Math.floor(Math.random() * room.messages.length);
                const randomMessage = room.messages.splice(randomIndex, 1)[0];

                broadcastToRoom(client.roomCode, {
                    type: 'randomMessage',
                    payload: { message: randomMessage }
                });
                break;
            }
        }
    });

    ws.on('close', () => {
        const client = clients.get(ws);
        if (!client) return;

        const room = rooms.get(client.roomCode);
        if (!room) return;

        // Remove user from room
        room.users.delete(client.userName);

        // If host disconnects, close the room
        if (client.isHost) {
            broadcastToRoom(client.roomCode, {
                type: 'roomClosed',
                payload: { message: 'Host has disconnected' }
            });
            rooms.delete(client.roomCode);
        } else {
            // Notify others that user left
            broadcastToRoom(client.roomCode, {
                type: 'userLeft',
                payload: { userName: client.userName }
            });
        }

        clients.delete(ws);
    });
});

function broadcastToRoom(roomCode, message) {
    const room = rooms.get(roomCode);
    if (!room) return;

    wss.clients.forEach(client => {
        if (clients.get(client)?.roomCode === roomCode && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

// Clean up empty rooms periodically
setInterval(() => {
    const now = Date.now();
    rooms.forEach((room, roomCode) => {
        if (room.users.size === 0 && now - room.createdAt > 3600000) { // 1 hour
            rooms.delete(roomCode);
            console.log(`Room ${roomCode} cleaned up due to inactivity`);
        }
    });
}, 300000); // Check every 5 minutes

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});
