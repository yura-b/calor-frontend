export interface Product {
  _id: string;
  title: string;
  price: number;
  oldPrice: number | null;
  photos: string[];
  category: category | string;
  subcategory: string;
  productDetails: string;
  description: string;
  size: string[];
  variations: string[];
}
export interface category {
  _id: string;

  categoryTitle: string;

  subCategory: string[];
}

export interface IBaseProduct {
  _id: string;
  photo: string;
  title: string;
}
