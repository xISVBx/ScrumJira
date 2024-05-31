import React from 'react';

interface ButtonProps {
  type?: 'default' | 'simple'
  outlined?: boolean;
  disabled?: boolean;
  shadow: boolean
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({type = 'default', outlined, disabled, onClick, children, shadow = true }) => {
  let classes = '';
  if (type === 'default') {
    classes = 'bg-background-light hover:opacity-80 bg-background-light text-white';
  } else if (type === 'simple') {
    classes = 'bg-transparent hover:opacity-50 ';
  }

  return (
    <button
      onClick={onClick}
      className={` font-bold py-2 px-4 rounded-md 
        ${classes}
        ${outlined ? 'border' : ''}
        ${shadow? 'shadow-lg ' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
