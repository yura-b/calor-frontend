import React from 'react';
import CustomButton from '@components/button/CustomButton.tsx';
import { useNavigate } from 'react-router';

const Events = () => {
  const navigate = useNavigate()
  const buttonHandler = () =>{
      navigate('/admin/createevent')
  }
  return (
    <div className={'flex flex-col gap-12'}>
      <div className={'flex flex-row justify-between'}>
        <h1 className={'text-xl font-bold'}>Events</h1>
        <CustomButton title={'+  Add New'} handler={buttonHandler}/>
      </div>
    </div>
  );
};

export default Events;