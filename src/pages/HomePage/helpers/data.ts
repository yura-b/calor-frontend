import homeCalorMade from '@assets/images/homeCalorMade.svg';
import allInOnePlace from '@assets/images/allInOnePlace.svg';
import homeCalorQuality from '@assets/images/homeCalorQuality.svg';
import homeCalorDesign from '@assets/images/homeCalorDesign.svg';
import accesories from '@assets/images/accesories.png';
import care from '@assets/images/care.png';
import homeCalorSpeed from '@assets/images/homeCalorSpeed.svg';
import homeCalorHandMade from '@assets/images/homeCalorHandMade.svg';
import homeCalorGuarantees from '@assets/images/homeCalorGuarantees.svg';
import homeCalorShipping from '@assets/images/homeCalorShipping.svg';
import { paths } from '@routes/paths';
import { MainMenuEnum } from '@/constants/enums/pages.enum';

export const processArr = [
  {
    title: 'DESIGN',
    content: 'Create a unique design for your shoes using our online 3D - constructor.',
  },
  {
    title: 'MANUFACTURE',
    content: 'We produce shoes according to your design and foot measurements within 7-10 business days.',
  },
  {
    title: 'DELIVERY',
    content: 'We pack and send your calors to the nearest post office in your area worldwide.',
  },
];

export const calorByYouItems = [
  {
    img: homeCalorMade,
  },
  {
    img: homeCalorDesign,
  },
  {
    img: homeCalorGuarantees,
  },
  {
    img: homeCalorShipping,
  },
  {
    img: homeCalorQuality,
  },
  {
    img: homeCalorHandMade,
  },
  {
    img: homeCalorSpeed,
  },
  {
    img: allInOnePlace,
  },
];

export const lookModels = [
  {
    img: accesories,
    title: MainMenuEnum.ACCESSORIES,
    path: paths.accessories,
  },
  {
    img: care,
    title: MainMenuEnum.SHOECAREPRODUCT,
    path: paths.shoe_care_product,
  },
];
