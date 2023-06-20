import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  children: React.ReactElement;
  title: string;
}

const Header: React.FC<Props> = ({ children, title }): React.ReactElement => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default Header;
