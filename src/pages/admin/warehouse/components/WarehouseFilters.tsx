import React, { FC } from 'react';
import { ProductsArr, ProductsEnum } from '@/constants/enums/products.enum.ts';
import { CustomSelect } from '@components/select/CustomSelect.tsx';
import { SelectChangeEvent } from '@mui/material/Select';
interface IProps {
  setProductFilter:(value: SelectChangeEvent) => void;
  productValue: ProductsEnum
}
const WarehouseFilters:FC<IProps> = ({setProductFilter,productValue}) => {
  return (
    <div className={'flex flex-row mx-8 my-6'}>

      <CustomSelect array={ProductsArr} defaultValue={ProductsEnum.empty} handleFunc={setProductFilter} value={productValue}/>
      
      <hr/>
    </div>
  );
};

export default WarehouseFilters;