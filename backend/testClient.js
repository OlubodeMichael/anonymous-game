const io = require('socket.io-client');

// Replace with your server's URL or use localhost for testing
const SERVER_URL = 'http://localhost:3001';

const client = io(SERVER_URL);

// Variables for testing
const testRoomId = 'test-room';
const isHost = true; // Set true to test as host
const limit = 10;

// Connect to the server
client.on('connect', () => {
    console.log(`Connected to server as client: ${client.id}`);

    // Join the test room
    client.emit('joinRoom', { roomId: testRoomId, isHost, limit });

    // Test sending messages
    setTimeout(() => {
        console.log('Sending a test message...');
        client.emit('sendMessage', { roomId: testRoomId, message: 'Hello from test client!' });
    }, 2000);

    // Test fetching the next random message (as host)
    if (isHost) {
        setTimeout(() => {
            console.log('Fetching the next random message...');
            client.emit('nextMessage', testRoomId);
        }, 4000);
    }
});

// Listen for server events
client.on('roomJoined', (data) => {
    console.log(`Joined room: ${data.roomId} with pseudonym: ${data.pseudonym}`);
});

client.on('participantsUpdated', (participants) => {
    console.log('Participants in the room:', participants);
});

client.on('displayMessage', (message) => {
    console.log('Random message from the server:', message);
});

client.on('roomClosed', () => {
    console.log('The room has been closed by the host.');
    client.disconnect();
});

// Handle errors
client.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});

client.on('disconnect', () => {
    console.log('Disconnected from the server.');
});

const roomId = 'test-room'; // Unique room ID


client.on('connect', () => {
    console.log(`Connected to server with ID: ${client.id}`);
    client.emit('joinRoom', { roomId, isHost }); // Emit to create/join room
});

client.on('roomJoined', (data) => {
    console.log(`Joined room: ${data.roomId} as ${data.pseudonym}`);
});
