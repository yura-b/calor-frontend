import React from 'react';
import { ArrowSquareLeft, PencilSimple } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';

const UserPageHeader = () => {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate('/admin/users');
  };
  return (
    <div className={'mb-4'}>
      <div className={'flex flex-row justify-between mx-12 py-6'}>
        <div className={'flex flex-row'}>
          <ArrowSquareLeft size={32} weight="fill" className={'h-full'} onClick={backHandler} />
          <div className={'flex flex-col'}>
            <p>Back to customer`s list</p>
            <h1 className={'font-bold'}>Customer`s Profile</h1>
          </div>
        </div>
        <div className={'flex flex-row items-center px-6 bg-black text-white'}>
          <PencilSimple size={32} weight="fill" />
          <span className={'ml-4'}>Edit</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default UserPageHeader;
