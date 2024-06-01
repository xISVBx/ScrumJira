import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

interface CircleAvatarProps {
  firstName?: string;
  lastName?: string;
  size: number;
  color?: string;
}

const CircleAvatar: React.FC<CircleAvatarProps> = ({ firstName, lastName, color = 'gray', size }) => {
  const initials = firstName && lastName ? `${firstName[0]}${lastName[0]}` : null;

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full text-white bg-${color}-500 p-1`}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        fontSize: `${size / 2.5}px`, // Adjust font size relative to the container
      }}
    >
      {initials ? (
        <span className="font-bold">{initials}</span>
      ) : (
        <FaUserAlt style={{ height: '75%', width: '75%' }} /> // Adjust icon size relative to the container
      )}
    </div>
  );
};

export default CircleAvatar;
