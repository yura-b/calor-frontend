import React from 'react';

interface Props {
  children: any;
  onClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

const Button: React.FC<Props> = ({ children, onClick, backgroundColor, textColor, className }) => {
  const buttonStyle = `base-text h-9 w-full border border-${backgroundColor} font-bold text-${textColor}  bg-${backgroundColor}  hover:bg-${textColor} hover:text-${backgroundColor} max-w-sm ${className}`;
  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
