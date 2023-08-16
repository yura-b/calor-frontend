import React, { FC, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import { AxiosResponse } from 'axios';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { showMessage } from '@/store/reducers/StatusReducer.ts';


interface IProps {
  available: boolean,
  _id: string,
  handler: (id: string, access_token: string) => Promise<AxiosResponse<any, any>>
  access_token?: string | null
}

const CustomToggle: FC<IProps> = ({ _id, available, handler, access_token }) => {
  const [selected, setSelected] = useState(available);
  const dispatch = useAppDispatch();
  const onChangeHandler = () => {
    if (!access_token) return;
    handler(_id, access_token).then((res) => {

      setSelected(!selected);

      dispatch(showMessage(`availability of ${res.data.color} changed to ${res.data.available}`));

    });
  };
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

export default CustomToggle;

