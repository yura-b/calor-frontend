import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface IProps {
  icon: ReactNode;
  title: string,
  navigateTo?: string
}
const HeaderElement:React.FC<IProps> = ({title,icon,navigateTo}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=> navigateTo && navigate(navigateTo)}>
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default HeaderElement;