import React, { useState } from 'react';
import UserProfileReviews from '@pages/admin/users/components/userProfile/components/UserProfileReviews.tsx';
import { Review } from '@/constants/interfaces/review.ts';
import { IOrder } from '@/constants/interfaces/order.ts';
import OrdersTable from '@pages/admin/main/components/OrdersGrid.tsx';
import Navigation from '@components/admin/Navigation.tsx';

export enum chosenSectionEnum {
  orderHistory = 'Orders History',
  reviews = 'Reviews',
  promoCode = 'Promo Codes',
  appointments = 'Appointments',
}

const sections: chosenSectionEnum[] = [
  chosenSectionEnum.orderHistory,
  chosenSectionEnum.reviews,
  chosenSectionEnum.promoCode,
  chosenSectionEnum.appointments,
];

interface IProps {
  reviews: Review[];
  orders: IOrder[];
}
const UserAdditionalInfo: React.FC<IProps> = ({ reviews, orders }) => {
  const [chosenSection, setChosenSection] = useState<string>(chosenSectionEnum.orderHistory);

  return (
    <div className={'flex flex-col mt-4'}>
      <Navigation setState={setChosenSection} state={chosenSection} array={sections} />
      <div>{chosenSection === chosenSectionEnum.reviews && <UserProfileReviews reviews={reviews} />}</div>
      <div>{chosenSection === chosenSectionEnum.orderHistory && <OrdersTable orderList={orders} />}</div>
    </div>
  );
};

export default UserAdditionalInfo;
