import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
interface Props {
  color: 'gray' | 'red' | 'mintExtraLight' | 'mint' | 'transparentGray' | 'transparentMint' | 'turquoise';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset';
  to?: string;
}

const Button: React.FC<Props> = ({ color, children, className, onClick, type, to }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick();
    }
  };
  const getButtonStyle = () => {
    switch (color) {
      case 'gray':
        return 'bg-gray text-white focus:text-mint hover:drop-shadow-2md';
      case 'red':
        return 'bg-custom-red text-white hover:drop-shadow-2md focus:text-mint';
      case 'mintExtraLight':
        return 'bg-mintExtraLight text-gray focus:text-mint hover:drop-shadow-2md';
      case 'mint':
        return 'bg-mint text-white border border-mint hover:bg-transparent hover:text-mint hover:border hover:border-mint focus:bg-darkRed hover:drop-shadow-2md';
      case 'turquoise':
        return 'bg-custom-turquoise text-gray border border-custom-turquoise   hover:border hover:border-custom-turquoise focus:text-mint hover:drop-shadow-2md';
      case 'transparentGray':
        return 'bg-transparent text-gray border border-gray hover:bg-lighterGray focus:text-mint hover:drop-shadow-2md';
      case 'transparentMint':
        return 'bg-transparent text-mint border border-mint hover:bg-mintExtraLight focus:text-gray hover:drop-shadow-2md';
      default:
        return '';
    }
  };
  return (
    <AnimatePresence>
      <motion.button
        type={type}
        className={`text-xl font-bold transition-all duration-300 h-11 w-full font-bold max-w-sm my-2 ${className} ${getButtonStyle()}`}
        onClick={handleClick}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  );
};

export default Button;
