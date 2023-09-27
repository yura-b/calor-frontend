import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '@components/ui/Spinner';
interface IProps {
  model: string;
}

const AditionalViews: FC<IProps> = ({ model }) => {
  const { view2, view3, view4 } = useSelector((state) => state.shoesConstructor[model]);
  const [image1Loaded, setImage1Loaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);
  const [image3Loaded, setImage3Loaded] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-5 my-4">
      <div className="bg-flash-white w-full flex justify-center items-center p-5">
        <div className="relative h-[242px] w-[345px] flex justify-center items-center z-0">
          {Object.values(view2).map((src, index, array) => {
            const zIndexClass =
              index === array.length - 1
                ? 'z-[-30]'
                : index === array.length - 2
                ? 'z-[-20]'
                : index === 4 || index === 5 || (model === 'sunrise' && index === 7)
                ? 'z-[30]'
                : 'z-[-10]';

            return (
              <>
                <img
                  key={index}
                  src={src}
                  className={`absolute ${zIndexClass}`}
                  style={{ marginRight: '5%', marginLeft: '5%' }}
                  onLoad={() => {
                    setImage1Loaded(true);
                  }}
                />
                {image1Loaded ? null : <Spinner className="absolute top-1/2 left-1/2" />}
              </>
            );
          })}
        </div>
      </div>

      <div className="bg-flash-white w-full flex justify-center items-center p-5">
        <div className="relative h-[242px] w-[345px] flex justify-center items-center z-0">
          {Object.values(view3).map((src, index, array) => (
            <>
              <img
                key={index}
                src={src}
                className={`absolute ${index === array.length - 1 ? 'z-[-20]' : 'z-[-10]'}`}
                style={{ marginRight: '5%', marginLeft: '5%' }}
                onLoad={() => {
                  setImage2Loaded(true);
                }}
              />
              {image2Loaded ? null : <Spinner className="absolute top-1/2 left-1/2" />}
            </>
          ))}
        </div>
      </div>

      <div className="bg-flash-white w-full flex justify-center items-center p-5">
        <div className="relative h-[242px] w-[345px] flex justify-center items-center z-0">
          {Object.values(view4).map((src, index, array) => (
            <>
              <img
                key={index}
                src={src}
                className={`absolute ${
                  index === array.length - 1 ? 'z-[-30]' : index === array.length - 2 ? 'z-[-20]' : 'z-[-10]'
                }`}
                style={{ marginRight: '5%', marginLeft: '5%' }}
                onLoad={() => {
                  setImage3Loaded(true);
                }}
              />
              {image3Loaded ? null : <Spinner className="absolute top-1/2 left-1/2" />}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AditionalViews;
