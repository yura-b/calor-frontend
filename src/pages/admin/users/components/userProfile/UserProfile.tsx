import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUser } from '@/api/users.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import UserInfo from '@pages/admin/users/components/userProfile/components/UserInfo.tsx';
import { IUser } from '@/constants/interfaces/user.ts';
import { Review } from '@/constants/interfaces/review.ts';
import UserAdditionalInfo from '@pages/admin/users/components/userProfile/components/UserAdditionalInfo.tsx';
import { IOrder } from '@/constants/interfaces/order.ts';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';

const userDataInitialState: IUser = {
  _id: '',
  email: '',
  email_verified: false,
  firstName: '',
  googleAccount: false,
  phoneNumber: null,
  registrationDate: null,
  roles: [],
  secondName: '',
  shippingInfo: null,
  registered: false
};
const UserProfile = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState<IUser>(userDataInitialState);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!access_token || !id) return;

    dispatch(loading());

    getUser(access_token, id).then((res) => {
      console.log(res.data);
      setUserInfo(res.data.user);
      setUserReviews(res.data.reviews);
      setUserOrders(res.data.orders);

      dispatch(loadingFinished());
    });
  }, [id]);

  if (!id) return <>wrong url</>;
  return (
    <div className={'pl-16'}>
      <UserInfo userDataState={{ state: userInfo, setState: setUserInfo }} withDelivery={false} />
      <hr />
      <UserAdditionalInfo reviews={userReviews} orders={userOrders} />
    </div>
  );
};

export default UserProfile;
