import { FC, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ShoeParts: FC = () => {
  const { view1 } = useSelector((state) => state.daygerModel);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const [parentHeight, setParentHeight] = useState(0);
  const [imageOnLoad, setImageOnLoad] = useState<boolean>(true);

  const handleImageOnLoad = () => {
    setImageOnLoad(false);
  };

  useEffect(() => {
    if (imageRef.current) {
      const imageHeight = imageRef.current.clientHeight;
      setParentHeight(imageHeight);
    }
  }, [imageOnLoad]);

  useEffect(() => {
    const updateParentHeight = () => {
      if (imageRef.current) {
        const imageHeight = imageRef.current.clientHeight;
        setParentHeight(imageHeight);
      }
    };

    updateParentHeight();

    window.addEventListener('resize', updateParentHeight);

    return () => {
      window.removeEventListener('resize', updateParentHeight);
    };
  }, []);

  return (
    <>
      <div style={{ height: parentHeight }} className="flex justify-center align-center mt-10 mb-2 mr-4 ml-4 relative">
        {Object.values(view1).map((src, index, array) =>
          index === array.length - 1 ? (
            <img
              src={src}
              ref={imageRef}
              className="absolute"
              style={{ marginRight: '5%', marginLeft: '5%' }}
              onLoad={handleImageOnLoad}
            />
          ) : (
            <img src={src} className="absolute" style={{ marginRight: '5%', marginLeft: '5%' }} />
          )
        )}
      </div>
    </>
  );
};

export default ShoeParts;
