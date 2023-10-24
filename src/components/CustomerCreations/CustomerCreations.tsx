import { useEffect, useState } from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import { useQuery } from 'react-query';
import { instagramGetPosts } from '@/api/instagram';

const CustomerCreations: React.FC = (): React.ReactElement => {
  const { data: instagramData, isLoading } = useQuery('instagramGetPosts', () => instagramGetPosts());
  const [instagramPhotos, setInstagramPhotos] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const mappedInstagramData = instagramData?.data.data.filter((item) => item.media_type === 'IMAGE');

      setInstagramPhotos(mappedInstagramData.slice(0, 5));
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
        {instagramPhotos.map((item) => (
          <div className="flex justify-center items-center lg:basis-1/5  my-4" key={item.id}>
            <div className={'w-36  text-gray lg:w-full '}>
              <img src={item.media_url} className="w-full object-contain max-h-[260px] min-h-[220px] mx-auto " />
            </div>
          </div>
        ))}
      </div>
      <Button color="gray" className="w-full my-4 lg:hidden" onClick={handleClick}>
        Follow Us
      </Button>
    </div>
  );
};

export default CustomerCreations;
