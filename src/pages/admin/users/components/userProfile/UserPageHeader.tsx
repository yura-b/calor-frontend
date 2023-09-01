import React, { FC } from 'react';
import { ArrowSquareLeft, PencilSimple } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';

interface IProps {
  url: string;
  upperText: string;
  bottomText: string;
  buttonAvailable: boolean;
}

const UserPageHeader: FC<IProps> = ({ buttonAvailable, url, bottomText, upperText }) => {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(url);
  };
  return (
    <div className={'mb-4'}>
      <div className={'flex flex-row justify-between mx-12 py-6'}>
        <div className={'flex flex-row'}>
          <ArrowSquareLeft size={32} weight="fill" className={'h-full cursor-pointer'} onClick={backHandler} />
          <div className={'flex flex-col'}>
            <p>{upperText}</p>
            <h1 className={'font-bold'}>{bottomText}</h1>
          </div>
        </div>
        {buttonAvailable && (
          <div className={'flex flex-row items-center px-6 bg-black text-white'}>
            <PencilSimple size={32} weight="fill" />
            <span className={'ml-4'}>Edit</span>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default UserPageHeader;
