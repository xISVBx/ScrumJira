import React, { useState, useRef, useEffect } from 'react';

interface DropdownButtonProps {
  color?: 'dark' | 'light';
  large?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  buttonLabel: React.ReactNode;
  children: React.ReactNode;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  color = 'dark',
  large,
  outlined,
  disabled,
  buttonLabel,
  children,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  let colorClass = '';
  if (color === 'dark') {
    colorClass = 'bg-background-dark hover:opacity-80';
  } else if (color === 'light') {
    colorClass = 'bg-transparent hover:opacity-80';
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={handleButtonClick}
        className={`text-white font-bold py-2 px-4 rounded-md shadow-lg 
          ${colorClass}
          ${large ? 'text-xl' : ''}
          ${outlined ? 'border' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        disabled={disabled}
      >
        {buttonLabel}
      </button>
      {dropdownVisible && (
        <div className="absolute w-48 rounded-md shadow-lg right-0">
          <div className="bg-background-light rounded-md z-50" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
