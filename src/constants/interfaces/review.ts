export interface Review {
  date: Date;
  email: string;
  user_id: string;
  isUserRegistered: boolean;
  experience: string;
  name: string;
  photo: string | null;
  product_id: string;
  rating: number;
  status: ReviewStatusEnum;
  _id: string;
}

export enum ReviewStatusEnum {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  PUBLISHED = 'PUBLISHED',
}
