import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  primary?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, primary = false, disabled = false }) => {
  const baseStyles = "px-4 py-2 rounded focus:outline-none transition duration-300 ease-in-out";
  const primaryStyles = primary ? "bg-blue-500 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${primaryStyles} ${disabledStyles} `}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
