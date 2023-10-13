import React, { FC, useState } from 'react';
import CustomInput from '@components/input/CustomInput.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import { Percent } from '@phosphor-icons/react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Navigation from '@components/admin/Navigation.tsx';
import { PromoCodeType, PromoCodeTypeArray } from '@/helpers/admin/constants/promoCodeType.ts';
import CustomButton from '@components/button/CustomButton.tsx';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { errorCorrupted } from '@/store/reducers/StatusReducer.ts';
import { PromoCodesDto } from '@/api/dto/promoCodes.dto.ts';

interface IProps {
  setData: React.Dispatch<React.SetStateAction<PromoCodesDto | undefined>>;
}
const format = 'MM-DD-YYYY'
const PromoCodesConstructor: FC<IProps> = ({ setData }) => {


  const dispatch = useAppDispatch();
  const [promoCodeType, setPromoCodeType] = useState<string>(PromoCodeType.percentage);

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [percentOff, setPercentOff] = useState<number>(0);
  const [amountOff, setAmountOff] = useState<number>(0);


  const isPercent = promoCodeType === PromoCodeType.percentage;

  const submitHandler = () => {
    if ((!percentOff && !amountOff)) {
      dispatch(errorCorrupted('You did not enter percentage or dollar amount'));
      return
    }
    if(!endDate || !startDate) {
      dispatch(errorCorrupted('Something went wrong enter dates again'));
      return
    }

    setData({
      endDate,
      startDate,
      isPercent,
      email: userEmail,
      amount_off: amountOff,
      percent_off: percentOff
    });

    setStartDate('')
    setEndDate('')
    setUserEmail('')
    setPercentOff(0)
    setAmountOff(0)
  };


  const discountValueHandler = (e: React.ChangeEvent<any>) => {
    if (isPercent) {
      if (e.target.value > 100) {
        dispatch(errorCorrupted('max value is 100'));
        return;
      }
      setPercentOff((Number(e.target.value)));
      return;
    }

    setAmountOff(Number(e.target.value));
  };

  const dateChangeHandler = (value: Dayjs | null, setState: React.Dispatch<React.SetStateAction<string>>) => {

    if (!value) return;

    setState(value.format(format));

  };


  return (
    <div className={'flex flex-col gap-5  p-5 w-2/5'}>
      <div className={'flex gap-5'}><Percent size={26} weight="fill" /> <p className={'font-bold'}>Generate Promo
        Code</p></div>
      <Navigation setState={setPromoCodeType} state={promoCodeType} array={PromoCodeTypeArray} />
      <div>
        <p>{isPercent ? 'max value:100' : ''}</p>
        <CustomInput
          type={InputType.number}
          value={isPercent ? percentOff : amountOff}
          onChange={discountValueHandler}
          border={'1px solid #D9D9D9'}
        />
      </div>

      <div>
        <p>User email (optional)</p>
        <CustomInput placeholder={''}
                     border={'1px solid #D9D9D9'}
                     value={userEmail}
                     onChange={(e) => setUserEmail(e.target.value)} />
      </div>
      <div className={'flex gap-6'}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker minDate={dayjs()} maxDate={dayjs(endDate)} className={'w-1/2'} label={'Start Date'} format={format}
                      onChange={(value) => dateChangeHandler(value as Dayjs, setStartDate)} />
          <DatePicker minDate={dayjs(startDate)}  className={'w-1/2'} label={'End Date'} format={format}
                      onChange={(value) => dateChangeHandler(value as Dayjs, setEndDate)} />
        </LocalizationProvider>
      </div>
      <CustomButton title={'Generate Promo Code'} styles={'!py-4'} handler={submitHandler} />
    </div>
  );
};

export default PromoCodesConstructor;