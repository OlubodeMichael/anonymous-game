// Generate a random 6-character room code
function generateRoomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Validate room code format
function validateRoomCode(code) {
    return /^[A-Z0-9]{6}$/.test(code);
}

module.exports = {
    generateRoomCode,
    validateRoomCode
};
