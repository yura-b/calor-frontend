import React, { FC, useState } from 'react';
import { DeliveryPrice, SaveDeliveryPrice } from '@/constants/interfaces/deliveryPrice.ts';
import { PencilSimple } from '@phosphor-icons/react';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';

const DeliveryPriceComponent: FC<{ deliveryPrice: DeliveryPrice, saveHandler: (data: SaveDeliveryPrice)=>void  }> = ({ deliveryPrice ,saveHandler}) => {
  const [viewMode, setViewMode] = useState(true);

  const [higherPriceState, setHigherPriceState] = useState(deliveryPrice.higherPrice);
  const [lowerPriceState, setLowerPriceState] = useState(deliveryPrice.lowerPrice);
  const [stripeNamingState, setStripeNamingState] = useState(deliveryPrice.stripeNaming);

  const clickHandler = () =>{
      saveHandler(
        {
          lowerPrice: Number(lowerPriceState),
          higherPrice: Number(higherPriceState),
          stripeNaming: stripeNamingState,
          _id: deliveryPrice._id
        }
      )

    setViewMode(true)
  }



  return (
    <div className={'flex flex-row items-center gap-8'}>
      <PencilSimple weight={'fill'} size={20} onClick={() => setViewMode(prevState => !prevState)} className={'cursor-pointer'} />
      <p className={'basis-1/5'}>{deliveryPrice.place}</p>
      <div className={'basis-1/5'}>
        {viewMode ? <span>{deliveryPrice.stripeNaming}</span> :
          <CustomInput value={stripeNamingState} onChange={changeHandler(setStripeNamingState)} />
        }
      </div>

      <div className={'basis-1/5'}>
        {viewMode ? <p>{deliveryPrice.higherPrice}$</p> :
          <CustomInput value={higherPriceState} type={InputType.number} onChange={changeHandler(setHigherPriceState)} />
        }
      </div>

      <div className={'basis-1/5'}>
              {viewMode ? <p>{deliveryPrice.lowerPrice}$</p> :
                <CustomInput value={lowerPriceState} type={InputType.number} onChange={changeHandler(setLowerPriceState)} />
              }
      </div>

      {!viewMode && <CustomButton title={'Save'} handler={clickHandler}/>}

    </div>
  );
};

export default DeliveryPriceComponent;




const changeHandler = (setState: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>) => {
  return (e: React.ChangeEvent<any>) => {
    setState(e.target.value);
  };
};