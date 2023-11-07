import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import VideoFrame from '@components/VideoFrame';
import StarRating from '@/components/ui/StarRating';

import { useQuery } from 'react-query';
import { getPageSection } from '@/api/manager/pages';
import VideoFrameWithId from '@components/VideoFrameWithId';
import { useMediaQuery } from '@react-hook/media-query';
import Spinner from '@components/ui/Spinner';

const VideoReviews: React.FC = () => {
  const { data, isLoading, error } = useQuery('getPageSection', () => getPageSection());
  const filteredPagesFooter = data?.data.filter((page) => page.page === 'Footer');
  const email = filteredPagesFooter?.find((section) => section?.section === 'Email').value;

  const videoGuides = [
    {
      src: '1AEstEk129ttSg_3lzmQLl0MxL9YGa3ys',
      name: 'Spencer Campbell',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description Description Description Description Description Description       Description      Description      Description',
    },
    {
      src: '1yealOepucRRhXAL6MQ5Nh6Ly6deS2z2T',
      name: 'Mary Naccarato',
      date: '22',
      rating: 1,
      description:
        'Description Description Description Description Description       Description      Description      Description',
    },
    {
      src: '1iZ09Zenri90m_5JQqOWSpcZEVHS9i0-d',
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
      src: '1n_icC3tsMqfcFIFTSiJSeqNiKYBDKLtI',
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
  const [iframeLoading, setIframeLoading] = useState(true);

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
          <div className="lg:flex lg:gap-6 flex-wrap lg:justify-between">
            {displayedVideoGuides.map((video, i) => (
              <div
                className={`${
                  isMobile ? 'mb-[20px] pb-[102vh] -mx-[80vh]' : ''
                }  py-0 lg:py-2 lg:basis-[22%]   relative `}
                key={i}
                style={{}}
              >
                {isMobile ? (
                  <>
                    {iframeLoading && <Spinner className="absolute top-1/2 left-1/2" />}
                    <iframe
                      src={`https://drive.google.com/file/d/${video.src}/preview`}
                      title="Vertical Video"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full max-h-[94%]"
                      onLoad={() => setIframeLoading(false)}
                    ></iframe>{' '}
                    <div className="flex justify-between lg:justify-evenly px-6 -mt-8 sm:mt-0 mb-4 lg:-mb-4 absolute inset-0 w-full top-[100%]">
                      <p className={`${styles.subtitle} py-2 mx-auto`}>{video.name}</p>
                      {/* <p className={`${styles.subtitle} py-2`}>{video.date}</p> */}
                    </div>
                  </>
                ) : (
                  <>
                    <VideoFrameWithId src={video.src} title="Video Review" className="xl:max-w-[18vw] min-h-[520px]" />
                    <div className="flex justify-between lg:justify-evenly px-6 -mt-8 sm:mt-0 mb-4 lg:-mb-4">
                      <p className={`${styles.subtitle} pb-4 mx-auto`}>{video.name}</p>
                      {/* <p className={`${styles.subtitle} py-2`}>{video.date}</p> */}
                    </div>
                  </>
                )}

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
