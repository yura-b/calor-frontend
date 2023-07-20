import React from 'react';
interface IProps {
  title: string;
}
const GridHeader: React.FC<IProps> = ({ title }) => {
  return (
    <div className={'flex flex-col'}>
      <h1 className={'p-6 font-bold'}>{title}</h1>
      <hr />
    </div>
  );
};

export default GridHeader;
