import { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import rightArrowIcon from '@assets/images/rightArrowIcon.svg';
import { ReactSVG } from 'react-svg';
import { debounce } from 'lodash';
import 'react-lazy-load-image-component/src/effects/blur.css';
import VideoDigital from '@components/VideoDigital';
import { useQuery } from 'react-query';
import { getPageSection } from '@/api/manager/pages';

const VideoSlider = ({ videoData, isHome }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const throttledHandleNext = debounce(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= videoData.length * 3 - 1 ? 0 : prevIndex + 1));
  }, 100);

  const throttledHandlePrev = debounce(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videoData.length - 1 : prevIndex - 1));
  }, 100);

  const slideWidth = 200;
  const translateX = -currentIndex * slideWidth;

  const duplicatedImages = [...videoData, ...videoData, ...videoData, ...videoData];

  const { data, isLoading, error } = useQuery('getPageSection', () => getPageSection());
  const filteredPagesFooter = data?.data.filter((page) => page.page === 'Footer');
  const email = filteredPagesFooter?.find((section) => section?.section === 'Email').value;

  const removeTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  const clearEmail = removeTags(email);
  return (
    <div className={styles.container}>
      <div className="flex gap-10 overflow-hidden">
        <motion.div
          className="w-full flex-shrink-0 gap-4"
          style={{
            display: 'flex',
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.5s ease',
            width: `${duplicatedImages.length * slideWidth}px`,
            // height: '520px',
          }}
        >
          {duplicatedImages.map((video, index) => (
            <div className={'relative  text-gray cursor-pointer'} key={index}>
              <VideoDigital
                srcMp4={video.srcMp4}
                name={video.name}
                showDescription={true}
                hideIcon={false}
                hideControls={false}
                className="w-[240px] "
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex gap-8 items-center justify-center mt-2">
        <button onClick={throttledHandlePrev} className="rounded-full bg-gray p-1 hover:bg-mint">
          <IconButton>
            <ReactSVG
              className="rotate-180"
              src={rightArrowIcon}
              beforeInjection={(svg) => {
                svg.classList.add('icon');
                svg.setAttribute('stroke', '#E2E0E0');
              }}
            />
          </IconButton>
        </button>
        <button onClick={throttledHandleNext} className="rounded-full bg-gray p-1 hover:bg-mint">
          <IconButton>
            <ReactSVG
              src={rightArrowIcon}
              beforeInjection={(svg) => {
                svg.classList.add('icon');
                svg.setAttribute('stroke', '#E2E0E0');
              }}
            />
          </IconButton>
        </button>
      </div>
      {!isHome && (
        <p className="w-full sm:max-w-[80%] md:max-w-[90%] lg:max-w-[100%] mx-auto mt-4">
          If you want your video review to be published on our website, please send it to our email{' '}
          <span className="font-bold">
            {isLoading ? (
              <p>Loading data...</p>
            ) : error ? (
              <p>Error loading data</p>
            ) : (
              <p>
                <a href={`mailto:${clearEmail}`} className="text-gray">
                  {clearEmail}
                </a>
              </p>
            )}
          </span>
        </p>
      )}
    </div>
  );
};

export default VideoSlider;
