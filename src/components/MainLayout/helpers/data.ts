import { paths } from '@routes/paths';
import privacy from '../../../../public/Privacy Policy_CALOR.pdf';
import conditions from './../../../../public/Terms and Conditions_CALOR.pdf';
import { CareProduct, AccessoriesProduct } from '@/constants/enums/products.enum';
import { MainMenuEnum } from '@/constants/enums/pages.enum';

export const menuItems = [
  {
    title: MainMenuEnum.DESIGNYOURSHOE,
    path: paths.design_shoe,
  },
  // {
  //   title: MainMenuEnum.DESIGNYOURBAG,
  //   path: paths.design_bag,
  // },
  // {
  //   title: MainMenuEnum.READYMADEPRODUCTS,
  //   path: paths.ready_made_products,
  //   subItems: [
  //     {
  //       subTitle: 'Item1',
  //       path: '',
  //     },
  //     {
  //       subTitle: 'Item2',
  //       path: '',
  //     },
  //   ],
  // },
  {
    title: MainMenuEnum.ACCESSORIES,
    path: paths.accessories,
    subItems: [
      {
        subTitle: 'All',
        path: paths.accessories,
      },
      {
        subTitle: AccessoriesProduct.BELTS,
        path: paths.accessories + '/' + AccessoriesProduct.BELTS.toLowerCase(),
      },
      {
        subTitle: AccessoriesProduct.BRACELETS,
        path: paths.accessories + '/' + AccessoriesProduct.BRACELETS.toLowerCase(),
      },
      {
        subTitle: AccessoriesProduct.LACES,
        path: paths.accessories + '/' + AccessoriesProduct.LACES.toLowerCase(),
      },
      {
        subTitle: AccessoriesProduct.SOUVENIRS,
        path: paths.accessories + '/' + AccessoriesProduct.SOUVENIRS.toLowerCase(),
      },
      {
        subTitle: AccessoriesProduct.TSHIRTS,
        path: paths.accessories + '/' + AccessoriesProduct.TSHIRTS.toLowerCase(),
      },
    ],
  },
  {
    title: MainMenuEnum.SHOECAREPRODUCT,
    path: paths.shoe_care_product,
    subItems: [
      {
        subTitle: 'All',
        path: paths.shoe_care_product,
      },
      {
        subTitle: CareProduct.BRUSHES,
        path: paths.shoe_care_product + '/' + CareProduct.BRUSHES.toLowerCase(),
      },
      {
        subTitle: CareProduct.CLEANERS,
        path: paths.shoe_care_product + '/' + CareProduct.CLEANERS.toLowerCase(),
      },
      {
        subTitle: CareProduct.PROTECTORS,
        path: paths.shoe_care_product + '/' + CareProduct.PROTECTORS.toLowerCase(),
      },
    ],
  },
  {
    title: MainMenuEnum.CUSTOMEREXPERIENCE,
    path: paths.customer_experience,
  },
];

export const helpLinks = [
  // Waiting videos
  // {
  //   title: 'Video Guides',
  //   path: paths.helpPage + '#helpVideoGuides',
  // },

  {
    title: 'Our Size Guide',
    path: paths.helpPage + '#sizeGuide',
  },
  {
    title: 'FAQ',
    path: paths.helpPage + '#FAQ',
  },
  {
    title: 'Shipping',
    path: paths.helpPage + '#shipping',
  },
  {
    title: 'Returns & Exchange',
    path: paths.helpPage + '#returns&Exchange',
  },
];
export const aboutLinks = [
  {
    subTitle: 'Who We Are',
    path: paths.about + '#who_we_are',
  },
  {
    subTitle: 'Our Story',
    path: paths.about + '#our_story',
  },
  {
    subTitle: 'Our Manufacture',
    path: paths.about + '#our_manufacture',
  },
  // {
  //   subTitle: 'Events',
  //   path: paths.about + '#events',
  // },
  // {
  //   subTitle: 'In The Press',
  //   path: paths.about + '#in_the_press',
  // },
];
export const privacyLinks = [
  {
    name: 'Privacy Policy',
    path: privacy,
    isPdfLink: true,
  },
  {
    name: 'Terms & Conditions',
    path: conditions,
    isPdfLink: true,
  },
];

export const mobileMenuCalorItems = ['Faster Checkout', 'Access Your Order History', 'Discounts', 'Rewards Program'];
