import { useEffect, useState } from 'react';
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

const CustomerCreations: React.FC = (): React.ReactElement => {
  const { data: instagramData, isLoading } = useQuery('instagramGetPosts', instagramGetPosts, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  const [instagramPhotos, setInstagramPhotos] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1023px)');
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
        (item) => item.media_type === 'IMAGE' || item.media_type === 'VIDEO'
      );
      setInstagramPhotos(mappedInstagramData.slice(0, 10));
    }
  }, [isLoading]);

  const handleClick = () => {
    window.open('https://www.instagram.com/calorshoe', '_blank');
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
              <div className="flex justify-center items-start lg:basis-1/5  my-4 h-[200px] " key={i}>
                <div className={'w-[200px] lg:w-full relative'}>
                  {item.media_type === 'IMAGE' ? (
                    <>
                      <LazyLoadImage
                        src={item.media_url}
                        className=" object-contain object-cover  mx-auto z-10 w-[260px] lg:w-[220px] xl:w-[240px]"
                        effect="blur"
                        afterLoad={() => {
                          setImageLoaded(true);
                        }}
                        beforeLoad={() => {
                          setImageLoaded(false);
                        }}
                      />
                      {imageLoaded ? null : <Spinner className="absolute left-1/2 top-1/2" />}
                    </>
                  ) : (
                    <>
                      {isVideoLoading && isVideoSupported && <Spinner className="absolute top-1/2 left-1/2" />}
                      {isVideoSupported && (
                        <>
                          <div className={'h-[40px] absolute top-[0%] right-[4%]'}>
                            <YouTubeIcon style={{ fontSize: '58px' }} color="error" />
                          </div>
                          <video
                            className="w-full"
                            controls
                            onLoadStart={() => setIsVideoLoading(true)}
                            onLoadedData={() => setIsVideoLoading(false)}
                          >
                            <source
                              src={item.media_url}
                              className="w-full object-contain max-h-[260px] min-h-[220px] mx-auto"
                              type="video/mp4"
                            />
                          </video>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button color="gray" className="w-full my-4 lg:hidden" onClick={handleClick}>
        Follow Us
      </Button>
    </div>
  );
};

export default CustomerCreations;
