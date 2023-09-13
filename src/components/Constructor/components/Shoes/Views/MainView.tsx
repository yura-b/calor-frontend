import { FC, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface IProps {
  model: string;
}

const MainView: FC<IProps> = ({ model }) => {
  const { view1 } = useSelector((state) => state.shoesConstructor[model]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const parentRef = useRef<HTMLDivElement | null>(null);

  //Dinamicly change the height of model container based on images height
  const updateParentHeight = () => {
    if (parentRef.current) {
      const maxHeight = Math.max(...imageRefs.current.map((ref) => ref?.clientHeight || 0));
      parentRef.current.style.height = `${maxHeight}px`;
    }
  };

  useEffect(() => {
    updateParentHeight();
    window.addEventListener('resize', updateParentHeight);

    return () => {
      window.removeEventListener('resize', updateParentHeight);
    };
  }, []);

  return (
    <div ref={parentRef} className="mt-10 mb-2 relative flex justify-center items-center w-wrapper mx-auto">
      {Object.values(view1).map((src, index, array) => (
        <img
          key={index}
          src={src}
          className={`absolute ${
            index === array.length - 1 ? 'z-[-30]' : index === array.length - 2 ? 'z-[-20]' : 'z-[-10]'
          }`}
          onLoad={() => {
            updateParentHeight();
          }}
          ref={(ref) => {
            imageRefs.current[index] = ref;
          }}
          alt={`Image ${index}`}
        />
      ))}
    </div>
  );
};

export default MainView;
