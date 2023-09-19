import styles from '@styles/Styles.module.scss';
import { fadeAnimation } from '@styles/Animations';
import { motion } from 'framer-motion';
import ReadMore from '@/components/ReadMore';
// import VideoManufacture from '@/components/VideoManufacture';
import { paths } from '@/routes/paths';
import Button from '@components/ui/Button';

interface Props {
  ourManufacture?: {
    title: string;
    value: string;
  };
}
const OurManufacture: React.FC<Props> = ({ ourManufacture }): React.ReactElement => {
  const initialText = ourManufacture?.value.match(/[^.!]+[.!]/g)?.slice(0, 3) || '';
  const expandedText = ourManufacture?.value || '';

  // const youtubeVideoId = 'J7YYYLJOKFI';
  return (
    <motion.div {...fadeAnimation} id="our_manufacture" className="lg:bg-custom-turquoise">
      <div className="relative z-10">
        <h1 className={`${styles.header1} ${styles.container} text-center pt-4 lg:pt-0 lg:pt-8 pb-2 lg:text-left z-10`}>
          About Our Manufacturing
        </h1>
        <div className="bg-custom-turquoise pb-6 lg:py-6 lg:bg-opacity-0">
          <div
            className={`${styles.container} max-w-[100vw] md:max-w-[80vw] lg:max-w-[70vw] py-0 lg:flex gap-6 lg:justify-between`}
          >
            {/* <div className="lg:basis-3/5">
            <VideoManufacture videoId={youtubeVideoId} />
          </div> */}
            <div className="flex flex-col xl:flex-row lg:basis-[100%] lg:justify-between">
              <div className="basis-[60%]">
                <ReadMore
                  initialText={initialText}
                  expandedText={expandedText}
                  className={`${styles.body1} pt-6  lg:pt-0 lg:mt-0 text-justify`}
                />
              </div>
              <div className="px-6 lg:px-0 flex gap-4 flex-col items-center basis-[30%]">
                <Button color="red" to={paths.design_shoe}>
                  Design Your Shoe
                </Button>
                {/* <Button color="mintExtraLight" to={paths.design_bag} className="lg:hidden">
                Design Your Bag
              </Button>
              <Button color="turquoise" to={paths.design_bag} className="hidden lg:block">
                Design Your Bag
              </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurManufacture;
