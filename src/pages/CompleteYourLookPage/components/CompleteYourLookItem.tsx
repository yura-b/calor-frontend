import React, {FC} from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { setStep, Steps } from '@/store/reducers/CompleteLookReducer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface IProps {
    item: {
        title: string;
        product: {
            title: string;
            price: number;
            photos: string[];
        }
    }
}

const CompleteYourLookItem: FC<IProps> = ({item}) => {
    return (
        <div className="flex flex-col p-5 w-full items-center max-w-2xl">
            <span className="text-mint text-center">
                {item.title}
            </span>
            <div className="flex flex-row gap-2 mt-9 justify-center">
                <div className="w-1/3" >
                    <LazyLoadImage 
                        src={item?.product?.photos[0]} 
                        alt=""
                        effect="blur"
                    />
                </div>
                <div className="w-1/2 flex flex-col">
                    <span className="font-bold">{item?.product?.title}</span>
                    <span className="mt-1">Details</span>
                    <div className="flex flex-row">
                        <span className="font-bold pr-2">Shiping:</span>
                        <span>Free</span>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row">
                            <span className="pr-2">$</span>
                            <span>{item?.product?.price}</span>
                        </div>
                        <div className="flex flex-row">
                            <span className="font-bold pr-2">Total:</span>
                            <span>{item?.product?.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompleteYourLookItem;