import { paths } from '@routes/paths';

export const menuItems = [
  {
    title: 'Design Your Shoe',
    path: paths.design_shoe,
  },
  {
    title: 'Design Your Bag',
    path: paths.design_bag,
  },
  {
    title: 'Accessories',
    path: paths.accessories,
    subItems: ['All', 'Belts', 'Bracelets', 'Laces', 'Souvenirs', 'T-Shirts'],
  },
  {
    title: 'Shoe Care Product',
    path: paths.shoe_care_product,
    subItems: ['All', 'Brushes', 'Cleaners', 'Protectors'],
  },
  {
    title: 'Customer Experience',
    path: paths.customer_experience,
  },
];

export const helpLinks = ['Video Guides', 'Size Guide', 'Check Order Status', 'FAQ', 'Shipping', 'Returns & Exchange'];
export const aboutLinks = ['Who We Are', 'Our Story', 'Our Manufacture', 'Events', 'In Press'];
export const privacyLinks = [
  {
    name: 'Privacy Policy',
    path: paths.privacy_policy,
  },
  {
    name: 'Cookies',
    path: paths.cookies,
  },
  {
    name: 'Terms & Condition',
    path: paths.terms_condition,
  },
];

export const mobileMenuCalorItems = [
  'Faster Checkout',
  'Access  Your Complete Order History',
  'Discount Rewards Program',
];
