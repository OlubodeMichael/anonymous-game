'use client';

export default function HostControls({ onKickUser, onBanUser }) {
  return (
    <div className="border-t p-4">
      <h3 className="font-bold mb-2">Host Controls</h3>
      <div className="flex gap-2">
        <button
          onClick={onKickUser}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Kick User
        </button>
        <button
          onClick={onBanUser}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Ban User
        </button>
      </div>
    </div>
  );
} 