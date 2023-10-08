import React from 'react';
import CustomButton from '@components/button/CustomButton.tsx';
import { useNavigate } from 'react-router';

const CatalogEvents = () => {
  const navigate = useNavigate()
  const navigateTo = (url: string) =>{
      navigate('/admin/catalog/' + url)
  }
  
  return (
    <div>
      <div className={'flex flex-row justify-end gap-12 p-5'}>
        <CustomButton title={'variations'} handler={()=> navigateTo('variations')}/>
      </div>
    </div>
  );
};

export default CatalogEvents;