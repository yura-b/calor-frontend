import React, { FC } from 'react';
import { DetailsAndProductName } from '@pages/admin/warehouse/WarehousePage.tsx';
import { TableCell, TableRow } from '@mui/material';
import { Color } from '@/constants/interfaces/details.ts';
import CustomToggle from '@components/admin/CustomToggle.tsx';
import { changeColorAvailability } from '@/api/warehouse.ts';
import { useAppSelector } from '@/store/hooks/hooks.ts';

interface IProps {
  details:  DetailsAndProductName ,
}

const DetailRow: FC<IProps> = ({details}) => {
  const { detail, products } = details

  const {access_token} = useAppSelector(state=> state.user)
  if (detail.materials.length !==1) {
    detail.materials[1].additional = true
    detail.materials[1].colors.map(color=>{
      return color.additional = true
    })
  }
  const colors = detail.materials.reduce((ac, el) => {
    return [...ac, ...el.colors];
  }, [] as Color[]);


  const additionalClass = (isAdditional = false) => {
    return isAdditional ?  'text-mint': ''
  }

  return (
    <TableRow key={detail._id}>
      <TableCell>
        {detail.title}
      </TableCell>
      <TableCell>
        <p key={products._id}>
            {products.title}
        </p>
      </TableCell>
      <TableCell>
        {detail.materials.map((material) => {
          return <p key={material._id} className={additionalClass(material.additional)}>
            {material.title}
          </p>;
        })}
      </TableCell>
      <TableCell>
        <div className={'flex flex-col gap-4 h-full'}>
          {colors.map(color => {
            return <p key={color._id} className={'h-6 p-0 m-0 ' + additionalClass(color.additional)}>
              {color.color}
            </p>;
          })}
        </div>
      </TableCell>
      <TableCell>
       <div className={'flex flex-col items-center gap-4'}>
         {
           colors.map(color => {
             return <CustomToggle key={color._id} _id={color._id} available={color.available} handler={changeColorAvailability} access_token={access_token} />;
           })
         }
       </div>
      </TableCell>
    </TableRow>
  );
};

export default DetailRow;