import React, { FC, useState } from 'react';
import { DetailsAndProductName } from '@pages/admin/warehouse/WarehousePage.tsx';
import { TableCell, TableRow } from '@mui/material';
import { Color } from '@/constants/interfaces/details.ts';
import CustomToggle from '@components/admin/CustomToggle.tsx';
import { changeColorAvailability } from '@/api/warehouse.ts';
import { useAppSelector } from '@/store/hooks/hooks.ts';

interface IProps {
  details:  DetailsAndProductName ,
 setDetails:React.Dispatch<React.SetStateAction<DetailsAndProductName[]>>
}

const DetailRow: FC<IProps> = ({details, setDetails}) => {
  const { detail, products } = details

  const {access_token} = useAppSelector(state=> state.user)

  const colors = detail.materials.reduce((ac, el) => {
    return [...ac, ...el.colors];
  }, [] as Color[]);


  return (
    <TableRow key={detail._id}>
      <TableCell>
        {detail.title}
      </TableCell>
      <TableCell>
        {products.map((productName) => {
          return <p key={productName._id}>
            {productName.title}
          </p>;
        })}
      </TableCell>
      <TableCell>
        {detail.materials.map((material) => {
          return <p key={material._id}>
            {material.title}
          </p>;
        })}
      </TableCell>
      <TableCell>
        {colors.map(color => {
          if (!color.photo) return <p key={color._id}>{color.color}</p>;
          return <a key={color._id} href={color.photo}>
            {color.color}
          </a>;
        })
        }
      </TableCell>
      <TableCell sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {
          colors.map(color => {
            return <CustomToggle key={color._id} _id={color._id} available={color.available} setDetails={setDetails} handler={changeColorAvailability} access_token={access_token} />;
          })
        }
      </TableCell>
    </TableRow>
  );
};

export default DetailRow;