function createRoom(hostId, limit = Infinity) {
    return {
        host: hostId,
        participants: [],
        limit,
        messages: [],
    };
}

function addMessage(room, message) {
    room.messages.push(message);
}

function getNextMessage(room) {
    if (room.messages.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * room.messages.length);
    return room.messages.splice(randomIndex, 1)[0];
}

module.exports = { createRoom, addMessage, getNextMessage };
