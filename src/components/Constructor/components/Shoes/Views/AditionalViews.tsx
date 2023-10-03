import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '@components/ui/Spinner';

interface IProps {
  model: string;
}

const AditionalViews: FC<IProps> = ({ model }) => {
  const { view2, view3, view4 } = useSelector((state) => state.shoesConstructor[model]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imageUrls = [...Object.values(view2), ...Object.values(view3), ...Object.values(view4)];
    const preloadImages = () => {
      let loadedImages = 0;
      const totalImages = imageUrls.length;

      imageUrls.forEach((url) => {
        const img = new Image();
        img.onload = () => {
          loadedImages++;

          if (loadedImages === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.src = url;
      });
    };

    preloadImages();
  }, [view2, view3, view4]);

  return (
    <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-5 my-4">
      <div className="bg-flash-white w-full flex justify-center items-center p-5">
        <div className="relative h-[242px] w-[345px] flex justify-center items-center z-0">
          {imagesLoaded ? (
            Object.values(view2).map((src, index, array) => (
              <img
                key={index}
                src={src}
                className={`absolute ${
                  index === array.length - 1 ? 'z-[-30]' : index === array.length - 2 ? 'z-[-20]' : 'z-[-10]'
                }`}
                style={{ marginRight: '5%', marginLeft: '5%' }}
              />
            ))
          ) : (
            <Spinner className="absolute top-1/2 left-1/2" />
          )}
        </div>
      </div>

      <div className="bg-flash-white w-full flex justify-center items-center p-5">
        <div className="relative h-[242px] w-[345px] flex justify-center items-center z-0">
          {imagesLoaded ? (
            Object.values(view3).map((src, index, array) => (
              <img
                key={index}
                src={src}
                className={`absolute ${index === array.length - 1 ? 'z-[-20]' : 'z-[-10]'}`}
                style={{ marginRight: '5%', marginLeft: '5%' }}
              />
            ))
          ) : (
            <Spinner className="absolute top-1/2 left-1/2" />
          )}
        </div>
      </div>

      <div className="bg-flash-white w-full flex justify-center items-center p-5">
        <div className="relative h-[242px] w-[345px] flex justify-center items-center z-0">
          {imagesLoaded ? (
            Object.values(view4).map((src, index, array) => (
              <img
                key={index}
                src={src}
                className={`absolute ${
                  index === array.length - 1 ? 'z-[-30]' : index === array.length - 2 ? 'z-[-20]' : 'z-[-10]'
                }`}
                style={{ marginRight: '5%', marginLeft: '5%' }}
              />
            ))
          ) : (
            <Spinner className="absolute top-1/2 left-1/2" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AditionalViews;
