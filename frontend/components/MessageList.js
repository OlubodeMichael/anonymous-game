'use client';

export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div key={index} className="mb-4">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-500">{message.sender}</p>
            <p className="mt-1">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 