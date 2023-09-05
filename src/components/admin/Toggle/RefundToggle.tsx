import React, { FC, useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

interface IProps {
  available: boolean;
  _id: string;
  handler: React.Dispatch<React.SetStateAction<string[]>>;
  access_token?: string | null;
}

const RefundToggle: FC<IProps> = ({ _id, available, handler }) => {
  const [selected, setSelected] = useState(available);
  const onChangeHandler = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    if (selected) handler(prevState => [...prevState, _id]);
    else handler(prevState => prevState.filter(id => id !== _id));
  }, [selected]);

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={onChangeHandler}
      style={{
        background: selected ? '#1EC1AA' : '', // Example background color change based on selection
        height: '25px',
        width: '25px'
      }}
    >
      <CheckIcon />
    </ToggleButton>
  );
};

export default RefundToggle;
