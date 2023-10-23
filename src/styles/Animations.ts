export const layoutFadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
  exit: { opacity: 0 },
};

export const scaleAnimation = {
  initial: { scale: 1 },
  animate: { scale: [0, 1, 1, 1, 1] },
  exit: { scale: 0 },
  transition: { duration: 3 },
};

export const scaleAnimationFast = {
  initial: { scale: 1 },
  animate: { scale: [0, 1, 1, 1, 1] },
  exit: { scale: 0 },
  transition: { duration: 1 },
};

export const fadeAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
};

export const layoutModalScaleAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.3 },
};

export const collapseAnimation = {
  key: 'content',
  initial: 'collapsed',
  animate: 'open',
  exit: 'collapsed',
  variants: {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  },
  transition: { duration: 0.2 },
};

export const hoverOnButtonAnimation = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.9 },
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};
