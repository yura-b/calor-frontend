import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';

import StarRating from '@/components/ui/StarRating';
import { useQuery } from 'react-query';
import { getPageSection } from '@/api/manager/pages';

import { useMediaQuery } from '@react-hook/media-query';

import Video from '@components/Video';

const VideoReviews: React.FC = () => {
  const { data, isLoading, error } = useQuery('getPageSection', () => getPageSection());
  const filteredPagesFooter = data?.data.filter((page) => page.page === 'Footer');
  const email = filteredPagesFooter?.find((section) => section?.section === 'Email').value;

  const videoGuides = [
    {
      src: '1pISvABcVlTMWN7-dwDfQ2KuQibu3qyue',
      name: 'Spencer Campbell',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description Description Description Description Description Description       Description      Description      Description',
    },

    {
      src: '1KKuAMcwRG-VNTBluBv5myrejNOnqDDjr',
      name: 'Mary Naccarato',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description       Description      Description      Description',
    },

    {
      src: '1zuXc_z6dsfXFr7LQNPiw5Kmh8P-WFGpt',
      name: 'Kylah Artz',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description       Description      Description      Description',
    },

    // {
    //   src: '1VxU8n8n9_M2Jnksng4hBnI8bphmls3Wj',
    //   name: 'Hermans',
    //   date: '22',
    //   rating: 1,
    //   description:
    //     'Description Description Description Description Description       Description      Description      Description',
    // },

    {
      src: '1Kaq5Ri5QIllwv7d0FJhUVoUPMdqjtVO8',
      name: 'Annaliese Jelsema',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description       Description      Description      Description',
    },
  ];
  const mobileBreakpoint = 640;
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const displayedVideoGuides = showAll ? videoGuides : videoGuides.slice(0, isMobile ? 2 : 4);

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
            Show More
          </button>
        </div>
      );
    }

    return (
      <div>
        <p>{text} </p>
        <button className="text-mint" onClick={() => setExpanded(false)}>
          Show Less
        </button>
      </div>
    );
  };

  return (
    <motion.div {...fadeAnimation} id="helpVideoGuides">
      <div
        className={`${
          window.innerWidth >= mobileBreakpoint ? styles.container : 'px-[20px]'
        } lg:flex flex-col items-center  mb-2 lg:mb-6 lg:py-0`}
      >
        <h1 className={`${styles.header1}  pt-4 pb-2 lg:pt-0 text-center`}>Video Reviews</h1>
        <div className="text-center w-full">
          <div className="md:flex md:gap-1 flex-wrap md:justify-between">
            {displayedVideoGuides.map((video, i) => (
              <div
                className={'py-0 lg:py-2 md:max-w-[44%]  lg:max-w-[30%]  xl:max-w-[22%]   relative'}
                key={i}
                style={{}}
              >
                <Video src={video.src} showDescription={true} name={video.name} />

                {/* <StarRating rating={video.rating} />
                <div className="px-6">
                  <Description text={video.description} />
                </div> */}
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
                <a href={`mailto:${email}`} dangerouslySetInnerHTML={{ __html: email || '' }} />
              )}
            </span>
          </p>

          {videoGuides.length > 2 && isMobile && (
            <button className="text-gray font-bold mt-4" onClick={toggleShowAll}>
              {showAll ? 'Show Less' : 'Show All'}
            </button>
          )}
          {videoGuides.length > 4 && !isMobile && (
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
