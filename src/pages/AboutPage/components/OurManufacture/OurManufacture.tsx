import styles from '@styles/Styles.module.scss';
import { fadeAnimation } from '@styles/Animations';
import { motion } from 'framer-motion';
import ReadMore from '@/components/ReadMore';
import Video from '@/components/Video';
import { paths } from '@/routes/paths';
import Button from '@components/ui/Button';

const OurManufacture = () => {
  const initialText =
    'CALOR shoes are 100% handmade shoes. We have our own manufacturer in Ukraine. In our team we have professionals who have more than 20 years’ experience in shoe construction and manufacture.';
  const expandedText =
    'CALOR shoes are 100% handmade shoes. We have our own manufacturer in Ukraine. In our team we have professionals who have more than 20 years’ experience in shoe construction and manufacture. CALOR shoes are 100% handmade shoes. We have our own manufacturer in Ukraine. In our team we have professionals who have more than 20 years’ experience in shoe construction and manufacture. ';
  const youtubeVideoId = 'J7YYYLJOKFI';
  return (
    <motion.div {...fadeAnimation}>
      <h1 className={`${styles.header1} text-center py-6`}>Our Manufacture</h1>
      <div className="bg-custom-turquoise pb-6 lg:py-6">
        <div className="container">
          <div className="lg:flex">
            <div className="lg:basis-1/2">
              <Video videoId={youtubeVideoId} />
            </div>
            <ReadMore initialText={initialText} expandedText={expandedText} className="mt-6 lg:basis-1/2 lg:mt-0" />
          </div>
          <div className="px-6 text-center mt-4">
            <Button color="red" to={paths.design_shoe} className="lg:mr-4">
              Design Your Shoe
            </Button>
            <Button color="mintExtraLight" to={paths.design_bag}>
              Design Your Bag
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurManufacture;
