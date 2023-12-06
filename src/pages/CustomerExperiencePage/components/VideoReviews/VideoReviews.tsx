import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';

import StarRating from '@/components/ui/StarRating';
import { useQuery } from 'react-query';
import { getPageSection } from '@/api/manager/pages';

import { useMediaQuery } from '@react-hook/media-query';
import VideoDigital from '@components/VideoDigital';
import { hoverOnButtonAnimation } from '@/styles/Animations';

const VideoReviews: React.FC = () => {
  const { data, isLoading, error } = useQuery('getPageSection', () => getPageSection());
  const filteredPagesFooter = data?.data.filter((page) => page.page === 'Footer');
  const email = filteredPagesFooter?.find((section) => section?.section === 'Email').value;
  const clearEmail = email?.replace(/<\/?p>/g, '');
  const videoGuides = [
    {
      srcWebm: '1pISvABcVlTMWN7-dwDfQ2KuQibu3qyue',
      srcMov: '1AEstEk129ttSg_3lzmQLl0MxL9YGa3ys',
      srcMp4: 'https://calor.sfo2.cdn.digitaloceanspaces.com/videos/spencer.mp4',
      name: 'Spencer Campbell',
      date: '22',
      rating: 1,
      description: '',
    },
    {
      srcWebm: '1KKuAMcwRG-VNTBluBv5myrejNOnqDDjr',
      srcMov: '1yealOepucRRhXAL6MQ5Nh6Ly6deS2z2T',
      srcMp4: 'https://calor.sfo2.cdn.digitaloceanspaces.com/videos/Mary.mp4',
      name: 'Mary Naccarato',
      date: '22',
      rating: 1,
      description: '',
    },

    {
      srcWebm: '1zuXc_z6dsfXFr7LQNPiw5Kmh8P-WFGpt',
      srcMov: '1iZ09Zenri90m_5JQqOWSpcZEVHS9i0-d',
      srcMp4: 'https://calor.sfo2.cdn.digitaloceanspaces.com/videos/kylah.mp4',
      name: 'Kylah Artz',
      date: '22',
      rating: 1,
      description: '',
    },
    {
      srcMp4: 'https://calor.sfo2.cdn.digitaloceanspaces.com/videos/hermans.mp4',
      name: 'Hermans',
      date: '22',
      rating: 1,
      description: '',
    },

    {
      srcWebm: '1Kaq5Ri5QIllwv7d0FJhUVoUPMdqjtVO8',
      srcMov: '1n_icC3tsMqfcFIFTSiJSeqNiKYBDKLtI',
      srcMp4: 'https://calor.sfo2.cdn.digitaloceanspaces.com/videos/Annaliese_Jelsema.mp4',
      name: 'Annaliese Jelsema',
      date: '22',
      rating: 1,
      description: '',
    },
    {
      srcMp4: 'https://calor.sfo2.cdn.digitaloceanspaces.com/videos/Candnce.mp4',
      name: 'Candnce',
      date: '22',
      rating: 1,
      description: '',
    },

    {
      srcMp4: 'https://calor.sfo2.cdn.digitaloceanspaces.com/videos/roshi1.mp4',
      name: 'Roshi',
      date: '22',
      rating: 1,
      description: '',
    },
  ];
  const mobileBreakpoint = 640;
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const isLargeScreen = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)');
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const displayedVideoGuides = showAll ? videoGuides : videoGuides.slice(0, isMobile ? 2 : isLargeScreen ? 3 : 4);

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

  const shouldShowButton =
    videoGuides.length > 2 &&
    (((isMobile || isLargeScreen) && videoGuides.length > 3) ||
      (!isMobile && !isLargeScreen && videoGuides.length > 4));

  return (
    <motion.div {...fadeAnimation} id="helpVideoGuides">
      <div
        className={`${
          window.innerWidth >= mobileBreakpoint ? styles.container : 'px-[20px]'
        } lg:flex flex-col items-center  mb-2 lg:mb-6 lg:py-0`}
      >
        <h1 className={`${styles.header1}  pt-4 pb-2 lg:pt-0 text-center`}>Video Reviews</h1>
        <div className="text-center w-full">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedVideoGuides.map((video, i) => (
              <div className={'  relative  lg:min-h-[200px]'} key={i}>
                <VideoDigital srcMp4={video.srcMp4} name={video.name} showDescription={true} />
                {/* <StarRating rating={video.rating} />
                <div className="px-6">
                  <Description text={video.description} />
                </div> */}
              </div>
            ))}
          </div>
          <p className="w-full sm:max-w-[80%] md:max-w-[90%] lg:max-w-[100%] mx-auto">
            If you want your video review to be published on our website, please send it to our email{' '}
            <span className="font-bold">
              {isLoading ? (
                <p>Loading data...</p>
              ) : error ? (
                <p>Error loading data</p>
              ) : (
                <p>
                  <a
                    href={`mailto:${clearEmail}`}
                    dangerouslySetInnerHTML={{ __html: clearEmail || '' }}
                    className="text-gray"
                  />
                </p>
              )}
            </span>
          </p>

          {shouldShowButton && (
            <motion.button
              className="bg-gray font-bold mt-4 text-white  px-12 py-2 hover:drop-shadow-2md"
              onClick={toggleShowAll}
            >
              {showAll ? 'Show Less' : 'Show All'}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoReviews;
