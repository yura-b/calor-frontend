import React, { ReactNode } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export interface IGoogleButton {
  handler: () => void;
  children: ReactNode;
}

const GoogleButton: React.FC<IGoogleButton> = ({ handler, children }) => {
  return (
    <Card
      onClick={handler}
      sx={{
        borderRadius: '0px',
        height: '44px',
        border: '1px solid #D9D9D9',
        width: '80%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <Typography>{children}</Typography>
      </CardContent>
    </Card>
  );
};

export default GoogleButton;
