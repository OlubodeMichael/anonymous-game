'use client';

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div key={index} className="mb-4">
          <div className="font-bold">{message.sender}</div>
          <div>{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList; 