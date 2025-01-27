import { useEffect, useState } from 'react';

/**
 * Custom hook to manage WebSocket connection.
 * @param {string} url - The WebSocket server URL.
 * @returns {Object} - WebSocket utilities and state.
 */
const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null); // WebSocket connection
    const [messages, setMessages] = useState([]); // List of messages in the room
    const [users, setUsers] = useState([]); // List of users in the room
    const [randomMessage, setRandomMessage] = useState(null); // Randomly selected message
    const [error, setError] = useState(null); // Error handling state

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connection established');
            setError(null);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setError('WebSocket connection closed');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'messageAdded':
                    setMessages((prev) => [...prev, data.message]);
                    break;

                case 'randomMessage':
                    setRandomMessage(data.message);
                    break;

                case 'userJoined':
                    setUsers((prev) => [...prev, data.userName]);
                    break;

                case 'error':
                    console.error(data.message);
                    setError(data.message);
                    break;

                default:
                    console.warn(`Unknown message type: ${data.type}`);
            }
        };

        setSocket(ws);

        return () => ws.close(); // Cleanup WebSocket on unmount
    }, [url]);

    /**
     * Sends a WebSocket message to the server.
     * @param {string} type - The type of message (e.g., 'sendMessage', 'nextMessage').
     * @param {Object} payload - The message payload (e.g., message text or roomCode).
     */
    const sendMessage = (type, payload) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type, payload }));
        } else {
            console.error('WebSocket is not open');
        }
    };

    return {
        messages,
        users,
        randomMessage,
        error,
        sendMessage,
    };
};

export default useWebSocket;
