import React, { useState } from 'react';
import CustomButton from '@components/button/CustomButton.tsx';
import dayjs from 'dayjs'; // Import dayjs
import 'dayjs/locale/en'; // Import the desired locale
import 'dayjs/locale/de'; // Import additional locales if needed
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomSearch from '@components/admin/CustomSearch.tsx';

interface nameFilter {
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  nameFilter: string;
}

interface IProps {
  nameFilter: nameFilter;
}

const UserGridHeader: React.FC<IProps> = ({ nameFilter }) => {
  return (
    <>
      <div className={'flex justify-between p-5'}>
        <h1 className={'font-bold'}>Customers</h1>
        <CustomButton title={'+ Create Profile'} />
      </div>
      <hr />
      <div className={'flex flex-col gap-4'}>
        <CustomSearch searchButton={nameFilter.setNameFilter}/>
        <div className={'flex flex-row gap-16 mx-4'}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className={'w-1/6'} label={'date'} />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
};

export default UserGridHeader;
