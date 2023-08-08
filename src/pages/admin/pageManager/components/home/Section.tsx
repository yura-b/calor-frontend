import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import CustomTextField from '@components/admin/CustomTextField.tsx';
import { setSpecificField } from '@/store/admin/PageManagerReducer.ts';

const Section: React.FC<{ value: string; title: string | null; id: string }> = ({ value, id, title }) => {
  const { isDisable } = useAppSelector((state) => state.pageManager);
  const dispatch = useAppDispatch();
  const handler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setSpecificField({ id, value: event.target.value }));
  };
  return (
    <div className={'w-[45%]'}>
      {title && <p>{title}</p>}
      <CustomTextField disabledField={isDisable} defaultValue={value} setValue={handler} />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Section);
