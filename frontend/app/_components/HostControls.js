'use client';

export default function HostControls({ onNextMessage, messagesCount }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded">
      <button
        onClick={onNextMessage}
        disabled={messagesCount === 0}
        className="p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        Next Message ({messagesCount})
      </button>
    </div>
  );
}
