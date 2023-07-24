import React from 'react';
import CustomButton from '../button/CustomButton';
interface IProps {
  title: string;
  buttonTitle: string;
}
const GridHeader: React.FC<IProps> = ({ title, buttonTitle }) => {
  return (
    <div className={'flex flex-col'}>
      <div className={'flex justify-between p-5'}>
        <h1 className={'font-bold text-lg'}>{title}</h1>
        {buttonTitle && <CustomButton title={buttonTitle} />}
      </div>
      <hr />
    </div>
  );
};

export default GridHeader;
