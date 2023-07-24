import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUser } from '@/api/users.ts';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import UserInfo from '@pages/admin/users/components/userProfile/components/UserInfo.tsx';
import { IUser } from '@/constants/interfaces/user.ts';
import { Review } from '@/constants/interfaces/review.ts';
import UserAdditionalInfo from '@pages/admin/users/components/userProfile/components/UserAdditionalInfo.tsx';

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
};
const UserProfile = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<IUser>(userDataInitialState);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  useEffect(() => {
    if (!access_token || !id) return;
    getUser(access_token, id).then((res) => {
      console.log(res);
      setUserInfo(res.data.user);
      setUserReviews(res.data.reviews);
    });
  }, [id]);

  if (!id) return <>wrong url</>;
  return (
    <div className={'pl-16'}>
      <UserInfo userDataState={{ state: userInfo, setState: setUserInfo }} />
      <hr />
      <UserAdditionalInfo reviews={userReviews} />
    </div>
  );
};

export default UserProfile;
