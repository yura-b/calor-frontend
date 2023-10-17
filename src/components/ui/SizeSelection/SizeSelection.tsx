import React, { useEffect } from 'react';
import styles from '@styles/Styles.module.scss';

interface Props {
  sizeButtonStyles: Record<number, string>;
  setSizeButtonStyles: (styles: Record<number, string>) => void;
  handleSizeClick: (size: string, index: number) => void;
  sizes: string[];
}

const SizeSelection: React.FC<Props> = ({ sizes, sizeButtonStyles, setSizeButtonStyles, handleSizeClick }) => {
  const updatedStyles = { 0: 'border-2 border-mint text-mint' };

  useEffect(() => {
    setSizeButtonStyles(updatedStyles);
  }, []);

  return (
    <>
      <p className={`${styles.body2} font-bold py-4`}>Please select your size</p>
      <div className="flex gap-2 flex-wrap justify-start items-center">
        {sizes?.map((size, index) => (
          <div className="basis-[20%] lg:basis-[18%] min-w-[80px]" key={size}>
            <button
              className={`m-0  font-bold transition-all duration-300 h-8 w-full font-bold   text-gray border border-gray hover:bg-lighterGray hover:drop-shadow-2md ${
                sizeButtonStyles[index] || ''
              }`}
              onClick={() => handleSizeClick(size, index)}
              data-size={size}
            >
              {size}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SizeSelection;
