import React, { FC, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '@components/ui/Spinner';
import { useLocation } from 'react-router-dom';
interface IProps {
  model: string;
}

const MainView: FC<IProps> = ({ model }) => {
  const { view1 } = useSelector((state) => state.shoesConstructor[model]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  useEffect(() => {
    const imagesToLoad = Object.values(view1).length;

    const updateParentHeight = () => {
      if (parentRef.current) {
        const maxHeight = Math.max(...imageRefs.current.map((ref) => ref?.clientHeight || 0));
        parentRef.current.style.height = `${maxHeight}px`;
      }
    };

    const handleImageLoad = () => {
      setLoadedImageCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === imagesToLoad) {
          updateParentHeight();
          setIsLoadingImages(false);
        }
        return newCount;
      });
    };

    window.addEventListener('resize', updateParentHeight);

    imageRefs.current.forEach((imageRef) => {
      if (imageRef) {
        imageRef.addEventListener('load', handleImageLoad);
      }
    });

    return () => {
      window.removeEventListener('resize', updateParentHeight);
      imageRefs.current.forEach((imageRef) => {
        if (imageRef) {
          imageRef.removeEventListener('load', handleImageLoad);
        }
      });
    };
  }, [view1]);

  return (
    <div
      ref={parentRef}
      className={`${
        location.pathname.includes('dayger')
          ? 'min-h-[240px] xs:min-h-[300px] sm:min-h-[340px] md:min-h-[440px]  lg:min-h-[500px]'
          : 'min-h-[140px] xs:min-h-[180px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[300px]'
      } mt-10 mb-2 relative flex justify-center items-center w-wrapper mx-auto `}
    >
      {Object.values(view1).map((src, index, array) => (
        <img
          key={index}
          src={src}
          className={`${
            isLoadingImages ? 'hidden ' : 'block '
          } absolute min-h-[120px] sm:min-h-[200px] md:min-h-[280px] lg:min-h-[300px] ${
            index === array.length - 1
              ? 'z-[-30]'
              : model === 'dayger' && index === 12
              ? 'z-[20]'
              : model === 'dayger' && index === 4
              ? 'z-[10]'
              : model === 'dayger' && index === 3
              ? 'z-[20]'
              : model === 'dayger' && index === 5
              ? 'z-[20]'
              : model === 'sunrise' && index === 4
              ? 'z-[30]'
              : model === 'sunrise' && index === 7
              ? 'z-[30]'
              : model === 'sunrise' && index === 6
              ? 'z-[20]'
              : model === 'yolo' && index === 11
              ? 'z-[20]'
              : model === 'yolo' && index === 10
              ? 'z-[10]'
              : model === 'yolo' && index === 11
              ? 'z-[20]'
              : index === array.length - 2
              ? 'z-[-20]'
              : 'z-[-10]'
          }`}
          ref={(ref) => {
            imageRefs.current[index] = ref;
          }}
          alt={`Image ${index}`}
        />
      ))}
      {isLoadingImages ? <Spinner className="absolute top-1/2 left-1/2" /> : null}
    </div>
  );
};

export default React.memo(MainView);
