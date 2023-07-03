import React from 'react';
interface Props {
  color: 'gray' | 'red' | 'mintExtraLight' | 'mint' | 'transparentGray';
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ color, children, className, onClick }) => {
  const getButtonStyle = () => {
    switch (color) {
      case 'gray':
        return 'bg-gray text-white focus:bg-black hover:drop-shadow-lg';
      case 'red':
        return 'bg-custom-red text-white hover:bg-mintExtraLight hover:text-gray hover:drop-shadow-lg';
      case 'mintExtraLight':
        return 'bg-mintExtraLight text-gray hover:bg-custom-red hover:text-white focus:bg-darkRed hover:drop-shadow-lg';
      case 'mint':
        return 'bg-mint text-white border border-mint hover:bg-transparent hover:text-mint hover:border hover:border-mint focus:bg-darkRed hover:drop-shadow-lg';
      case 'transparentGray':
        return 'bg-transparent text-gray border border-gray hover:bg-lighterGray focus:bg-darkRed hover:drop-shadow-lg';
      default:
        return '';
    }
  };
  return (
    <button
      className={`base-text transition-all duration-300 h-9 w-full font-bold text max-w-sm my-2 ${className} ${getButtonStyle()}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
