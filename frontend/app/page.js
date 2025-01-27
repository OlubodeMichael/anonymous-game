'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomName, setRoomName] = useState('');

  const handleJoinRoom = () => {
    if (roomId.trim() && userName.trim()) {
      router.push(`/room/${roomId}?name=${encodeURIComponent(userName)}&isHost=false`);
    }
  };

  const handleCreateRoom = () => {
    if (roomName.trim() && userName.trim()) {
      const newRoomId = Math.random().toString(36).substr(2, 6).toUpperCase();
      router.push(`/room/${newRoomId}?name=${encodeURIComponent(userName)}&isHost=true`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl mb-8 text-center">Anonymous Messaging Board</h1>
        
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {!isCreatingRoom ? (
            <>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                placeholder="Enter Room Code"
                className="p-2 border rounded placeholder:text-black text-black"
                maxLength={6}
              />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name"
                className="p-2 border rounded placeholder:text-black text-black"
              />
              <button 
                onClick={handleJoinRoom}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!roomId.trim() || !userName.trim()}
              >
                Join Room
              </button>
              <div className="text-center my-2">or</div>
              <button 
                onClick={() => setIsCreatingRoom(true)}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Create New Room
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Room Name"
                className="p-2 border rounded placeholder:text-black text-black"
              />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name (Host)"
                className="p-2 border rounded placeholder:text-black text-black"
              />
              <button 
                onClick={handleCreateRoom}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={!roomName.trim() || !userName.trim()}
              >
                Create Room
              </button>
              <button 
                onClick={() => setIsCreatingRoom(false)}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Back to Join
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}