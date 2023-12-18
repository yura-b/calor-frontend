import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import { useQuery } from 'react-query';
import { getPageSection } from '@/api/manager/pages';
import { useMediaQuery } from '@react-hook/media-query';
import VideoDigital from '@components/VideoDigital';
import VideoSlider from '../VideoSlider';
import { useLocation } from 'react-router-dom';
import { paths } from '@/routes/paths';
import VideoFrame from '@components/VideoFrame';

const VideoReviewsSlider: React.FC = () => {
  const { data, isLoading, error } = useQuery('getPageSection', () => getPageSection());
  const filteredPagesFooter = data?.data.filter((page) => page.page === 'Footer');
  const email = filteredPagesFooter?.find((section) => section?.section === 'Email').value;

  const removeTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  const clearEmail = removeTags(email);

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

  const isMobile = useMediaQuery('(max-width: 1023px)');
  const location = useLocation();
  const isHome = location.pathname === paths.home;

  return (
    <motion.div {...fadeAnimation} id="helpVideoGuides">
      <div className=" text-center ">
        <div className={`${styles.container} my-0 pb-0 pt-1 `}>
          <h1 className={styles.header1}>Video Reviews</h1>
          {!isMobile && <VideoSlider videoData={videoGuides} isHome={isHome} />}
          {isMobile && (
            <>
              <div className="flex justify-between overflow-x-auto flex-row gap-2 mx-auto lg:gap-10">
                {videoGuides.map((video, i) => (
                  <div className="flex justify-center items-center lg:basis-1/5  my-2" key={i}>
                    <div className={'w-[200px] lg:w-full  relative'}>
                      {/* <VideoDigital srcMp4={video.srcMp4} name={video.name} showDescription={true} /> */}
                      <VideoFrame
                        src={video.srcMp4}
                        title={video.name}
                        className="xl:max-w-[50vw]"
                        isVerticalVideo={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {!isHome && (
                <p className="w-full sm:max-w-[80%] md:max-w-[90%] lg:max-w-[100%] mx-auto py-2">
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
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoReviewsSlider;
