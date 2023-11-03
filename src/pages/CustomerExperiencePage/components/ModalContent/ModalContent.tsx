import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '@components/ui/Spinner';

const ModalContent = ({ data, isVideoLoading, isVideoSupported }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      {data.media_type == 'VIDEO' && (
        <div className={'relative text-gray w-auto max-w-[50vh]'}>
          {isVideoLoading && isVideoSupported && <Spinner className="absolute top-1/2 left-1/2" />}
          {isVideoSupported && (
            <>
              <video
                autoPlay
                controls
                onLoadStart={() => isVideoLoading(true)}
                onLoadedData={() => isVideoLoading(false)}
              >
                <source src={data.media_url} className="w-full object-contain mx-auto" type="video/mp4" />
              </video>
            </>
          )}
        </div>
      )}
      {data.media_type == 'IMAGE' && (
        <div className="relative">
          <LazyLoadImage
            src={data.media_url}
            className={
              'object-contain object-cover mx-auto h-full max-w-[100vw] sm:max-w-[80vw] max-h-[80vh] lg:max-w-[30vw]'
            }
            effect="blur"
          />
          {!imageLoaded && <Spinner className="absolute left-1/2 top-1/2" />}
          <img src={data.media_url} alt="Lazy-loaded image" onLoad={() => setImageLoaded(true)} className="hidden" />
        </div>
      )}
    </>
  );
};

export default ModalContent;
