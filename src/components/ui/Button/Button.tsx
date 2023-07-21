import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';
interface Props {
  color: 'gray' | 'red' | 'mintExtraLight' | 'mint' | 'transparentGray' | 'transparentMint';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset';
}

const Button: React.FC<Props> = ({ color, children, className, onClick, type }) => {
  const getButtonStyle = () => {
    switch (color) {
      case 'gray':
        return 'bg-gray text-white focus:text-mint hover:drop-shadow-lg';
      case 'red':
        return 'bg-custom-red text-white hover:drop-shadow-lg focus:text-mint';
      case 'mintExtraLight':
        return 'bg-mintExtraLight text-gray focus:text-mint hover:drop-shadow-lg';
      case 'mint':
        return 'bg-mint text-white border border-mint hover:bg-transparent hover:text-mint hover:border hover:border-mint focus:bg-darkRed hover:drop-shadow-lg';
      case 'transparentGray':
        return 'bg-transparent text-gray border border-gray hover:bg-lighterGray focus:text-mint hover:drop-shadow-lg';
      case 'transparentMint':
        return 'bg-transparent text-mint border border-mint hover:bg-mintExtraLight focus:text-gray hover:drop-shadow-lg';
      default:
        return '';
    }
  };
  return (
    <AnimatePresence>
      <motion.button
        type={type}
        className={`text-xl font-bold transition-all duration-300 h-11 w-full font-bold max-w-sm my-2 ${className} ${getButtonStyle()}`}
        onClick={onClick}
        {...hoverOnButtonAnimation}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  );
};

export default Button;
