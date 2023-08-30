export interface PostReviewDto {
  product_id: string;
  user_id?: string;
  rating: number;
  experience: string;
  firstName: string;
  secondName: string;
  email: string;
  photo: string;
  productName?: string;
  category?: string;
  price?: number;
  _id?: string;
  date?: string;
  status?: string;
}
