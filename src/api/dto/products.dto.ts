import { category } from '@/constants/interfaces/product.ts';

export interface ProductsDto {
  name: string;
  price: number;
  photos: string[];
  category: category | string;
  subcategory: string;
  description: string;
  size: number[];
  _id?: string;
  rating?: number;
  title?: string;
  productDetails: string;
}

export interface IProperty {
  shouldChange: boolean;

  propertyValue: string | number | string[];

  propertyName: string;
}
class IValues {
  [name: string]: IProperty;
}

export interface EditItemDto {
  id: string;

  values: IValues;
}

export interface EditVariationElementDto {
  variantId: string;

  elementId: string;
}
