import { useState, useEffect } from 'react';
import { fadeAnimation, hoverOnButtonAnimation } from '@styles/Animations';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@styles/Styles.module.scss';
import { Link } from 'react-router-dom';
import { fetchNewsArticles } from "@/api/apiFunctions/newsArticles";
import Loader from "@/components/ui/Loader";

const InThePress = () => {
  const [inThePressArticles, setInThePressArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewsArticlesData = async () => {
      const newsArticlesData = await fetchNewsArticles();
      setInThePressArticles(newsArticlesData);
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
          <motion.div className="flex flex-wrap gap-2 justify-between">
            {inThePressArticles.map((item, i) => (
              <Link to="#" key={i} className="basis-[30%] lg:basis-[15%]">
                <motion.div
                  {...hoverOnButtonAnimation}
                  key={i}
                  className="text-center bg-lightGray px-6 py-3 w-full min-h-[50px] lg:min-h-[120px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${item.photo})` }}
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
