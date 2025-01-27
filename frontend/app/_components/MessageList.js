'use client';

export default function MessageList({ messages }) {
  return (
    <div className="flex flex-col gap-2 h-[400px] overflow-y-auto p-4 bg-gray-50 rounded">
      {messages.map((msg, index) => (
        <div 
          key={index}
          className="p-2 bg-white rounded shadow"
        >
          <span className="font-bold">{msg.userName}:</span>
          <p className="mt-1">{msg.message}</p>
          <span className="text-xs text-gray-500">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
}
