export const layoutFadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1 },
};

export const scaleAnimation = {
  initial: { scale: 1 },
  animate: { scale: [0, 1, 1, 1, 1] },
  transition: { duration: 3 },
};

export const fadeAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 2 },
};

export const layoutModalScaleAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.3 },
};
