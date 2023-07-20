import React from 'react';
import HelpFooter from '../HelpFooter';

const Footer: React.FC = (): React.ReactElement => {
  return (
    <footer className="bg-gray text-white">
      <HelpFooter title={'Get Help'} color="white" />
    </footer>
  );
};

export default Footer;
