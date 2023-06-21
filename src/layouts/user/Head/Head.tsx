import React from 'react';
import { Helmet } from 'react-helmet'

interface Props {
    title: string;
}

const Head: React.FC<Props> = ({ title }): React.ReactElement => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  );
};

export default Head;
