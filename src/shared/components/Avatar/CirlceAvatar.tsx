import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

interface CircleAvatarAvatarProps {
  firstName?: string;
  lastName?: string;
  color?: string;
}

const CircleAvatar: React.FC<CircleAvatarAvatarProps> = ({ firstName, lastName, color = 'gray' }) => {
  const initials = firstName && lastName ? `${firstName[0]}${lastName[0]}` : null;

  return (
    <div className={`inline-flex items-center justify-center rounded-full bg-${color}-500 text-white`} style={{ width: '100%', height: '100%' }}>
      {initials ? (
        <span className="text-xl font-bold">{initials}</span>
      ) : (
        <FaUserAlt className="text-2xl" />
      )}
    </div>
  );
};

export default CircleAvatar;
