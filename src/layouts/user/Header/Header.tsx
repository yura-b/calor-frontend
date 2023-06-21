import React from 'react';

interface Props {
  children: React.ReactElement;
}

const Header: React.FC<Props> = ({ children }): React.ReactElement => {
  return children;
};

export default Header;
