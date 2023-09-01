import React from 'react';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { cleanUserData } from '@/store/reducers/UserReducer.ts';
import { SignOut } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';

const CustomSignOut: React.FC<{ size: number }> = ({ size }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickHandler = () => {
    dispatch(cleanUserData());
    navigate('/login');
  };
  return (
    <div className={'text-custom-red flex cursor-pointer items-center'} onClick={onClickHandler}>
      <SignOut size={size} weight="fill" />
      <span className={'ml-4'}>Sign Out</span>
    </div>
  );
};

export default CustomSignOut;
