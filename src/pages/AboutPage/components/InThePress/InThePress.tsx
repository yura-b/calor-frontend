import { useState, useEffect } from 'react';
import { fadeAnimation, hoverOnButtonAnimation } from '@styles/Animations';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@styles/Styles.module.scss';
import { Link } from 'react-router-dom';
import { fetchNewsArticles } from '@/api/apiFunctions/newsArticles';
import Loader from '@/components/ui/Loader';

interface PressDto {
  newsArticle: string;
  photo: string;
  title: string;
}

const InThePress = () => {
  const [inThePressArticles, setInThePressArticles] = useState<PressDto[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewsArticlesData = async () => {
      const newsArticlesData: PressDto[] = await fetchNewsArticles();
      setInThePressArticles(newsArticlesData.reverse());
      setLoading(false);
    };
    fetchNewsArticlesData();
  }, []);

  return (
    <motion.div {...fadeAnimation} className={`${styles.container} py-6`} id="in_the_press">
      <h1 className={`${styles.header1} text-center mb-6 lg:text-left`}>In The Press</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <AnimatePresence initial={false}>
          <motion.div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {inThePressArticles.map((item, i) => (
              <Link to={item.newsArticle} key={i} target="_blank" className="flex items-center justify-center">
                <motion.img
                  {...hoverOnButtonAnimation}
                  key={i}
                  className="w-full object-fit max-h-[160px] max-w-[160px] xl:max-h-[200px]  xl:max-w-[200px] border border-[10px]  border-lightGray"
                  src={item.photo}
                />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default InThePress;
