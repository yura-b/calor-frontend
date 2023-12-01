import { useEffect, useState, useRef } from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import { useQuery } from 'react-query';
import { instagramGetPosts } from '@/api/instagram';
import { useMediaQuery } from '@react-hook/media-query';
import Slider from '@/pages/CustomerExperiencePage/components/Slider';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '@components/ui/Spinner';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Modal from '@mui/material/Modal';
import X from '@assets/images/SignUpHeaderImg/X.png';
import ModalContent from '@pages/CustomerExperiencePage/components/ModalContent';
import VideoDigital from '@components/VideoDigital';

const CustomerCreations: React.FC = (): React.ReactElement => {
  const { data: instagramData, isLoading } = useQuery('instagramGetPosts', instagramGetPosts, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  const [instagramPhotos, setInstagramPhotos] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const checkVideoSupport = () => {
    const videoElement = document.createElement('video');
    setIsVideoSupported(!!videoElement.canPlayType);
  };
  useEffect(() => {
    checkVideoSupport();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const mappedInstagramData = instagramData?.data.data.filter(
        (item) => item.media_type === 'IMAGE' || item.media_type === 'VIDEO' || item.media_type === 'CAROUSEL_ALBUM'
      );
      setInstagramPhotos(mappedInstagramData.slice(0, 10));
    }
  }, [isLoading]);

  const handleClick = () => {
    window.open('https://www.instagram.com/calorshoe', '_blank');
  };

  const openModal = (index) => {
    setClickedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.container}>
      <p className={styles.subtitle}>Customer Creations</p>
      <div className="flex justify-between items-center gap-4">
        <h1 className={'text-2xl font-black text-gray lg:text-3xl xl:text-4xl'}>@calorshoe</h1>
        <Button color="gray" className="w-full my-4 hidden lg:block" onClick={handleClick}>
          Follow Us
        </Button>
      </div>
      <div className="flex overflow-x-auto flex-row gap-2 mx-auto lg:gap-10">
        {!isMobile && <Slider data={instagramPhotos} instagramStyles={true} />}
        {isMobile && (
          <div className="flex justify-between overflow-x-auto overflow-y-hidden flex-row gap-2 mx-auto lg:gap-10">
            {instagramPhotos.map((item, i) => (
              <div className="flex justify-center items-start lg:basis-1/5   h-[220px] " key={i}>
                <div
                  className={`${
                    item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM'
                      ? ' min-w-[220px] '
                      : 'w-[200px]'
                  } lg:w-full relative`}
                >
                  {item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM' ? (
                    <div onClick={() => openModal(i)} className="cursor-pointer">
                      <LazyLoadImage
                        src={item.media_url}
                        className="object-cover mx-auto z-10 w-[300px] lg:w-[220px] xl:w-[240px] h-[240px]"
                        effect="blur"
                      />
                      {!imageLoaded && <Spinner className="absolute left-1/2 top-1/2" />}
                      <img
                        src={item.media_url}
                        alt="Lazy-loaded image"
                        onLoad={() => setImageLoaded(true)}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="w-full object-contain  mx-auto" onClick={() => openModal(i)}>
                        <div className={'h-[40px] absolute top-[0%] right-[4%] z-20'}>
                          <YouTubeIcon style={{ fontSize: '38px', color: 'white' }} />
                        </div>
                        <VideoDigital
                          hideIcon={true}
                          hideControls={true}
                          srcMp4={item.media_url}
                          className="min-h-[200px] w-[200px] h-[420px] -mt-[50px]"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal open={isModalOpen} onClose={closeModal} style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
          <div
            className="w-full flex flex-col items-center justify-center  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ outline: 'none' }}
          >
            <div className="cursor-pointer w-auto p-2" onClick={closeModal}>
              <img src={X} alt="Close" className=" w-5 h-5 filter brightness-0 invert" />
            </div>

            <ModalContent data={instagramPhotos[clickedIndex]} isVideoSupported={isVideoSupported} />
          </div>
        </Modal>
      </div>
      <Button color="gray" className="w-full my-4 lg:hidden" onClick={handleClick}>
        Follow Us
      </Button>
    </div>
  );
};

export default CustomerCreations;
