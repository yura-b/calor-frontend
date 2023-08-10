import React, { FC, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import { AxiosResponse } from 'axios';
import { DetailsAndProductName } from '@pages/admin/warehouse/WarehousePage.tsx';


interface IProps {
  available: boolean,
  _id: string,
  handler: (id: string, access_token: string) => Promise<AxiosResponse<any, any>>
  access_token?: string | null
  setDetails: React.Dispatch<React.SetStateAction<DetailsAndProductName[]>>

}

const CustomToggle: FC<IProps> = ({ _id, available, handler, access_token, setDetails }) => {
  const [selected, setSelected] = useState(available);

  const onChangeHandler = () => {
    if (!access_token) return;
    handler(_id, access_token).then(() => {
      setSelected(!selected);
      setDetails(prevState => {
        return prevState.map(details => {
          details.detail.materials.map(materials => {
            materials.colors.map(color => {
              if (color._id === _id) {
                color.available = !color.available;
              }
            });
          });
          return details;
        });
      });
    });
  };
  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={onChangeHandler}
      style={{
        background: selected ? '#1EC1AA' : '' // Example background color change based on selection
      }}
    >
      <CheckIcon />
    </ToggleButton>

  );
};

export default CustomToggle;

