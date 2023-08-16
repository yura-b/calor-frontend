import React from 'react';

const ProductionDay: React.FC<{ day: number }> = ({ day }) => {
  if (day === 0) return <></>;
  let bgColor;
  switch (day) {
    case 4: {
      bgColor = 'bg-orange-600 text-white';
      break;
    }
    case 5: {
      bgColor = 'bg-red-800 text-white';
      break;
    }
    default: {
      bgColor = 'bg-neutral-300';
    }
  }

  if (day > 5) {
    bgColor = 'bg-red-800 text-white';
  }

  return <span className={'rounded-full text-center text-black px-3 py-1 ' + bgColor}>{day}th day</span>;
};

export default ProductionDay;
