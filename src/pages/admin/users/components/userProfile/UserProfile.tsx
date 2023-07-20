import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUser } from '@/api/users.ts';
import { useAppSelector } from '@/store/hooks/hooks.ts';

const UserProfile = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (!access_token || !id) return;
    getUser(access_token, id).then((res) => {
      console.log(res);
    });
  }, [id]);

  if (!id) return <>wrong url</>;

  return <div></div>;
};

export default UserProfile;
