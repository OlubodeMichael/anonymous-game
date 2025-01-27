'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ChatInput from '@/app/_components/ChatInput';
import MessageList from '@/app/_components/MessageList';
import HostControls from '@/app/_components/HostControls';
import useWebSocket from '@/app/_utils/socket';

export default function RoomPage() {
    const params = useParams();
    const roomId = params.id;
    
    const [userName, setUserName] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [hasJoined, setHasJoined] = useState(false);

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
    const { messages, users, randomMessage, error, sendMessage } = useWebSocket(wsUrl);

    // Join the room when userName and roomId are set
    useEffect(() => {
        if (roomId && userName && !hasJoined) {
            if (isHost) {
                sendMessage('createRoom', { userName, roomName: `Room ${roomId}` });
            } else {
                sendMessage('joinRoom', { roomCode: roomId, userName });
            }
            setHasJoined(true);
        }
    }, [roomId, userName, hasJoined, isHost, sendMessage]);

    // If roomId is not available, show loading
    if (!roomId) {
        return <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl">Loading...</p>
        </div>;
    }

    // Ask for userName if not set
    if (!userName) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl mb-6">Welcome to Room: {roomId}</h1>
                <div className="w-full max-w-md space-y-4">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsHost(true)}
                            className="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Join as Host
                        </button>
                        <button
                            onClick={() => setIsHost(false)}
                            className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Join as Participant
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Room: {roomId}</h1>
                    <h2 className="text-xl">Welcome, {userName}!</h2>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Participants</h3>
                    <ul className="space-y-1">
                        {users.map((user, index) => (
                            <li key={index} className="px-2 py-1 bg-white rounded">
                                {user}
                            </li>
                        ))}
                    </ul>
                </div>

                <MessageList messages={messages} />

                {randomMessage && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Random Message</h3>
                        <div className="bg-white p-2 rounded">
                            <span className="font-bold">{randomMessage.userName}:</span>{' '}
                            {randomMessage.message}
                        </div>
                    </div>
                )}

                <ChatInput
                    onSendMessage={(message) => 
                        sendMessage('sendMessage', { message })
                    }
                />

                {isHost && (
                    <HostControls
                        onNextMessage={() => sendMessage('nextMessage')}
                        messagesCount={messages.length}
                    />
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </div>
        </div>
    );
} 