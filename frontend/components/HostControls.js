'use client';

const HostControls = ({ isHost }) => {
  if (!isHost) return null;

  return (
    <div className="p-4 border-t">
      <h3 className="font-bold mb-2">Host Controls</h3>
      {/* Add host control buttons/features here */}
    </div>
  );
};

export default HostControls; 