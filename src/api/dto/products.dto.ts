export interface ProductsDto {
  name: string;
  price: number;
  photos: string[];
  category: string;
  subcategory: string;
  description: string;
  size: number[];
  _id?: string;
  rating?: number;
  title?: string;
}
