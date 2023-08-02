import React from 'react';

type HomeArrowRightIconProps = {
  color: string;
  className?: string;
};

const HomeArrowRightIcon: React.FC<HomeArrowRightIconProps> = ({ color, className }): React.ReactElement => {
  return (
    <div className="m-auto">
      <svg
        className={`${className} w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6`}
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 13.77 12.99"
      >
        <path d="M5.8,7.09.38.58H8.73l5.42,6.51L8.73,13.56H.38Z" transform="translate(-0.38 -0.58)" />
      </svg>
    </div>
  );
};

export default HomeArrowRightIcon;
