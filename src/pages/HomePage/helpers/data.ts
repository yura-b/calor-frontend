import homeCalorMade from '@assets/images/homeCalorMade.svg';
import homeCalorQuality from '@assets/images/homeCalorQuality.svg';
import homeCalorDesign from '@assets/images/homeCalorDesign.svg';
import accesories from '@assets/images/accesories.svg';
import care from '@assets/images/care.svg';
import homeCalorSpeed from '@assets/images/homeCalorSpeed.svg';
import homeCalorHandMade from '@assets/images/homeCalorHandMade.svg';
import homeCalorGuarantees from '@assets/images/homeCalorGuarantees.svg';
import homeCalorShipping from '@assets/images/homeCalorShipping.svg';
import { paths } from '@routes/paths';
import { MainMenuEnum } from '@/constants/enums/pages.enum';

export const processArr = [
  {
    title: 'DESIGN',
    content: 'Make a unique design for your shoes with the help of our online designer.',
  },
  {
    title: 'MANUFACTURE',
    content: 'We produce shoes according to your design and foot sizes in 7-10 business days.',
  },
  {
    title: 'DELIVERY',
    content: 'We pack and send your Calors to the nearest post office in your area around the globe',
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
