import styles from '@styles/Styles.module.scss';
import { fadeAnimation } from '@styles/Animations';
import { motion } from 'framer-motion';
import ReadMore from '@/components/ReadMore';
import VideoManufacture from '@/components/VideoManufacture';
import { paths } from '@/routes/paths';
import Button from '@components/ui/Button';

const OurManufacture = () => {
  const initialText =
    'CALOR shoes are 100% handmade shoes. We have our own manufacturer in Ukraine. In our team we have professionals who have more than 20 years’ experience in shoe construction and manufacture.';
  const expandedText =
    'CALOR shoes are 100% handmade shoes. We have our own manufacturer in Ukraine. In our team we have professionals who have more than 20 years’ experience in shoe construction and manufacture. CALOR shoes are 100% handmade shoes. We have our own manufacturer in Ukraine. In our team we have professionals who have more than 20 years’ experience in shoe construction and manufacture. ';
  const youtubeVideoId = 'J7YYYLJOKFI';
  return (
    <motion.div {...fadeAnimation} id="our_manufacture">
      <h1 className={`${styles.header1} text-center py-6`}>Our Manufacture</h1>
      <div className="bg-custom-turquoise pb-6 lg:py-6">
        <div className={`${styles.container} max-w-[100vw] md:max-w-[80vw] lg:max-w-[70vw] py-0 lg:flex gap-6`}>
          <div className="lg:basis-1/2">
            <VideoManufacture videoId={youtubeVideoId} />
          </div>
          <ReadMore
            initialText={initialText}
            expandedText={expandedText}
            className={`${styles.body1} pt-6 lg:basis-1/2 lg:pt-0`}
          />
        </div>
        <div className={`${styles.container} py-0`}>
          <Button color="red" to={paths.design_shoe} className="lg:mr-4">
            Design Your Shoe
          </Button>
          <Button color="mintExtraLight" to={paths.design_bag}>
            Design Your Bag
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OurManufacture;
