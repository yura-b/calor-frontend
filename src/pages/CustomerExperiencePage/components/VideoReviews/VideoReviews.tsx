import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import VideoFrame from '@components/VideoFrame';
import StarRating from '@/components/ui/StarRating';

import { useQuery } from 'react-query';
import { getPageSection } from '@/api/manager/pages';

const VideoReviews: React.FC = () => {
  const { data, isLoading, error } = useQuery('getPageSection', () => getPageSection());
  const filteredPagesFooter = data?.data.filter((page) => page.page === 'Footer');
  const email = filteredPagesFooter?.find((section) => section?.section === 'Email').value;

  const videoGuides = [
    {
      src: 'https://drive.google.com/file/d/1l4VfItYOQO7xZxqJX93nmfNz2VT9ONXU/preview',
      name: 'Name Customer',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description Description Description Description Description Description       Description      Description      Description',
    },
    {
      src: 'https://drive.google.com/file/d/1l4VfItYOQO7xZxqJX93nmfNz2VT9ONXU/preview',
      name: 'Name Customer',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description       Description      Description      Description',
    },
    {
      src: 'https://drive.google.com/file/d/1l4VfItYOQO7xZxqJX93nmfNz2VT9ONXU/preview',
      name: 'Name Customer',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description       Description      Description      Description',
    },
    {
      src: 'https://drive.google.com/file/d/1l4VfItYOQO7xZxqJX93nmfNz2VT9ONXU/preview',
      name: 'Name Customer',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description       Description      Description      Description',
    },
  ];
  const mobileBreakpoint = 640;
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const displayedVideoGuides = showAll ? videoGuides : videoGuides.slice(0, 2);

  const Description = ({ text }) => {
    const [expanded, setExpanded] = useState(false);

    if (text.length <= 100) {
      return <p>{text}</p>;
    }

    if (!expanded) {
      return (
        <div>
          <p>{text.slice(0, 100)}... </p>
          <button className="text-mint" onClick={() => setExpanded(true)}>
            Read More
          </button>
        </div>
      );
    }

    return (
      <div>
        <p>{text} </p>
        <button className="text-mint" onClick={() => setExpanded(false)}>
          Read Less
        </button>
      </div>
    );
  };

  return (
    <motion.div {...fadeAnimation} id="helpVideoGuides">
      <div
        className={`${
          window.innerWidth >= mobileBreakpoint ? styles.container : ''
        } lg:flex flex-col items-center  mb-2 lg:mb-6 lg:py-0`}
      >
        <h1 className={`${styles.header1}  pt-4 pb-2 lg:pt-0 text-center`}>Video Reviews</h1>
        <div className="text-center w-full">
          <div className="lg:flex lg:gap-6 flex-wrap">
            {displayedVideoGuides.map((video, i) => (
              <div className="py-2 lg:basis-[48%]" key={i}>
                <VideoFrame src={video.src} title="Video Guide" className="xl:max-w-[50vw]" />
                <div className="flex justify-between lg:justify-evenly px-6">
                  <p className={`${styles.subtitle} py-2`}>{video.name}</p>
                  <p className={`${styles.subtitle} py-2`}>{video.date}</p>
                </div>
                <StarRating rating={video.rating} />
                <div className="px-6">
                  <Description text={video.description} />
                </div>
              </div>
            ))}
          </div>
          <p>
            If you want your video review to be published on our website, please send it to our email{' '}
            <span className="font-bold">
              {isLoading ? (
                <p>Loading data...</p>
              ) : error ? (
                <p>Error loading data</p>
              ) : (
                <a href={`mailto:${email}`}>{email}</a>
              )}
            </span>
          </p>

          {videoGuides.length > 3 && (
            <button className="text-gray font-bold mt-4" onClick={toggleShowAll}>
              {showAll ? 'Show Less' : 'Show All'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoReviews;
