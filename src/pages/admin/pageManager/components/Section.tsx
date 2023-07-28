import React from 'react';
import {useAppDispatch, useAppSelector} from '@/store/hooks/hooks.ts';
import CustomTextField from '@components/admin/CustomTextField.tsx';
import {setSpecificField} from '@/store/admin/PageManagerReducer.ts';

const Section: React.FC<{ value: string, title: string | null }> = ({value, title}) => {
    const {isEnable} = useAppSelector(state => state.pageManager)
    const dispatch = useAppDispatch()
    const handler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setSpecificField({title: title, value: event.target.value}))
    }
    return (
        <div className={'w-[45%]'}>
            {title && <p>{title}</p>}
                <CustomTextField  disabledField={isEnable} defaultValue={value} setValue={handler}/>
        </div>
    );
};

export default Section;
