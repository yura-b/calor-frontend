import { FC, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ShoeParts: FC = () => {
  const { view2, view3, view4 } = useSelector((state) => state.daygerModel);

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-5 my-4">
        <div className="bg-flash-white w-full flex justify-center items-center p-5">
          <div className="relative h-[242px] w-[345px] flex justify-center items-center z-0">
            {Object.values(view2).map((src, index, array) =>
              index === array.length - 1 ? (
                <div key={index} className="absolute z-[-20]">
                  <img src={src} />
                </div>
              ) : (
                <div key={index} className="absolute z-[-10]">
                  <img src={src} />
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-flash-white w-full flex justify-center items-center p-5">
          <div className="relative h-[242px] w-[345px] flex justify-center items-center z-0">
            {Object.values(view3).map((src, index) => (
              <div key={index} className="absolute">
                <img src={src} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-flash-white w-full flex justify-center items-center p-5">
          <div className="relative h-[242px] w-[345px] flex justify-center items-center z-0">
            {Object.values(view4).map((src, index, array) =>
              index === array.length - 1 ? (
                <div key={index} className="absolute z-[-20]">
                  <img src={src} />
                </div>
              ) : (
                <div key={index} className="absolute z-[-10]">
                  <img src={src} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoeParts;
