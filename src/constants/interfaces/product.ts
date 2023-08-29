export interface Product {
  name: string;
  price: number;
  photos: string[];
  category: category;
  subcategory: string;
  description: string;
  size: number[];
}
export interface category {
  _id: string;

  categoryTitle: string;

  subCategory: string[];
}
