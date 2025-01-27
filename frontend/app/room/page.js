import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useWebSocket from '../../utils/socket';
import ChatInput from '../../components/ChatInput';
import MessageList from '../../components/MessageList';
import HostControls from '../../components/HostControls';

export default function RoomPage() {
    const router = useRouter();
    const { roomCode } = router.query;

    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [hasJoined, setHasJoined] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);

    const { messages, users, randomMessage, sendMessage, error } = useWebSocket(process.env.NEXT_PUBLIC_WS_URL);

    useEffect(() => {
        if (roomCode && userName && !hasJoined) {
            if (isHost) {
                sendMessage('createRoom', { roomName, userName });
            } else {
                sendMessage('joinRoom', { roomCode, userName });
            }
            setHasJoined(true);
        }
    }, [roomCode, userName, hasJoined, sendMessage, isHost, roomName]);

    if (!roomCode) {
        return <p>Loading...</p>;
    }

    if (!userName) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Welcome to Room: {roomCode}</h1>
                {!showNameInput ? (
                    <>
                        <input
                            type="text"
                            placeholder="Enter room name"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            style={{ padding: '10px', marginBottom: '10px' }}
                        />
                        <button
                            onClick={() => {
                                setIsHost(true);
                                setShowNameInput(true);
                            }}
                            style={{ padding: '10px 20px' }}
                        >
                            Create Room
                        </button>
                        <button
                            onClick={() => {
                                setIsHost(false);
                                setShowNameInput(true);
                            }}
                            style={{ padding: '10px 20px', marginLeft: '10px' }}
                        >
                            Join as Participant
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    setHasJoined(false);
                                }
                            }}
                            style={{ padding: '10px', marginBottom: '10px' }}
                        />
                        <button
                            onClick={() => setHasJoined(false)}
                            style={{ padding: '10px 20px' }}
                        >
                            {isHost ? 'Create Room' : 'Join Room'}
                        </button>
                    </>
                )}
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h1>Room: {roomCode}</h1>
            <h2>Welcome, {userName}!</h2>

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <h3>Participants</h3>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            </div>

            <MessageList messages={messages} />

            {randomMessage && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Random Message</h3>
                    <p>
                        <strong>{randomMessage.userName}:</strong> {randomMessage.message}
                    </p>
                </div>
            )}

            <ChatInput
                onSend={(message) => sendMessage('sendMessage', { roomCode, userName, message })}
            />

            {isHost && (
                <HostControls
                    onNext={() => sendMessage('nextMessage', { roomCode })}
                />
            )}

            {error && (
                <div style={{ color: 'red', marginTop: '20px' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
}
