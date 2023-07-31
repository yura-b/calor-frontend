import React from 'react';
import CustomButton from '../button/CustomButton';
interface IProps {
  title?: string;
  buttonTitle?: string;
  click?: () =>void
}
const GridHeader: React.FC<IProps> = ({ title, buttonTitle, click }) => {
  return (
    <div className={'flex flex-col'}>
      <div className={'flex justify-between p-5'}>
        <h1 className={'font-bold text-lg'}>{title}</h1>
        {buttonTitle && <CustomButton handler={click} title={buttonTitle} />}
      </div>
      <hr />
    </div>
  );
};

export default GridHeader;
