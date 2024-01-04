import React, { FC } from 'react';
import { DetailsAndProductName } from '@pages/admin/warehouse/WarehousePage.tsx';
import { TableCell, TableRow } from '@mui/material';
import { Color } from '@/constants/interfaces/details.ts';
import CustomToggle from '@components/admin/Toggle/CustomToggle.tsx';
import { changeMaterialAvailability } from '@/api/warehouse.ts';
import { useAppSelector } from '@/store/hooks/hooks.ts';

interface IProps {
  details: DetailsAndProductName;
}

const DetailRow: FC<IProps> = ({ details }) => {
  const { detail, products } = details;

  const { access_token } = useAppSelector((state) => state.user);
  // if (detail.materials.length !== 1) {
  //   detail.materials[1].additional = true;
  //   detail.materials[1].colors.map((color) => {
  //     return (color.additional = true);
  //   });
  // }

  const additionalClass = (isAdditional = false) => {
    return isAdditional ? 'text-mint' : '';
  };

  return (
    <TableRow key={detail._id}>
      <TableCell>{detail.title}</TableCell>
      <TableCell>
        <p key={products._id}>{products.title}</p>
      </TableCell>
      <TableCell align={'center'}>
        <div className={'flex flex-col gap-2'}>
          {detail.materials.map((material) => {
            return (
              <p key={material._id} className={additionalClass(material.additional)}>
                {material.title}
              </p>
            );
          })}
        </div>
      </TableCell>
      <TableCell align={'center'}>
        <div className={'flex flex-col gap-2 items-center'}>
          {detail.materials.map((material) => {
            return (
              <CustomToggle
                key={material._id}
                _id={material._id}
                available={material.available}
                handler={changeMaterialAvailability}
                access_token={access_token}
              />
            );
          })}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DetailRow;
