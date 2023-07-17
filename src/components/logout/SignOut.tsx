import React from 'react';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { cleanUserData } from '@/store/reducers/UserReducer.ts';
import { SignOut } from '@phosphor-icons/react';

const CustomSignOut = () => {
  const dispatch = useAppDispatch();
  const onClickHandler = () => {
    dispatch(cleanUserData());
  };
  return (
    <div className={'text-custom-red flex cursor-pointer items-center'} onClick={onClickHandler}>
      <SignOut size={32} weight="fill" />
      <span className={'ml-4'}>Sign Out</span>
    </div>
  );
};

export default CustomSignOut;
