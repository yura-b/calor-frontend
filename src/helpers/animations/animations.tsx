import { motion } from 'framer-motion';

export const AnimatedText = ({ text }) => {
  return (
    <>
      {text
        .toLocaleUpperCase()
        .split('')
        .map((char, index) => (
          <motion.span key={index} whileHover={{ letterSpacing: '0.3rem' }} transition={{ duration: 0.3 }}>
            {char}
          </motion.span>
        ))}
    </>
  );
};
export default AnimatedText;
