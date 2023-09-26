export interface Product {
  _id: string;
  title: string;
  price: number;
  photos: string[];
  category: category | string;
  subcategory: string;
  productDetails: string;
  description: string;
  size: number[];
}
export interface category {
  _id: string;

  categoryTitle: string;

  subCategory: string[];
}
