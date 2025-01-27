'use client';
import { useState } from 'react';

export default function RoomForm({ onJoin, onCreate }) {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCreatingRoom) {
      onCreate({ roomName, userName });
    } else {
      onJoin({ roomCode, userName });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
      {isCreatingRoom ? (
        <>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name (Host)"
            className="p-2 border rounded"
            required
          />
          <button 
            type="submit"
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create Room
          </button>
          <button 
            type="button"
            onClick={() => setIsCreatingRoom(false)}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Join
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            placeholder="Enter Room Code"
            className="p-2 border rounded"
            maxLength={6}
            required
          />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="p-2 border rounded"
            required
          />
          <button 
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Join Room
          </button>
          <div className="text-center my-2">or</div>
          <button 
            type="button"
            onClick={() => setIsCreatingRoom(true)}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create New Room
          </button>
        </>
      )}
    </form>
  );
}
