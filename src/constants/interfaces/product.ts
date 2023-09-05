export interface Product {
  _id
  title: string;
  price: number;
  photos: string[];
  category: category | string;
  subcategory: string;
  description: string;
  size: number[];
}
export interface category {
  _id: string;

  categoryTitle: string;

  subCategory: string[];
}
