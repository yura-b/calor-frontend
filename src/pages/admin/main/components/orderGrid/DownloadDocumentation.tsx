import React, { FC } from 'react';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { errorCorrupted } from '@/store/reducers/StatusReducer.ts';
interface IProps {
  title:string,
  link: string
}
const DownloadDocumentation:FC<IProps> = ({link, title}) => {
  const dispatch = useAppDispatch()
  const onClickHandler =()=> {
    if (!link) {
    dispatch(errorCorrupted(`This order doesnt have ${title}`))  
    return
    }
    window.location.href = link
  }
  return (
    <div className={'cursor-pointer bg-neutral-500 text-white rounded-full px-3 py-2'} onClick={onClickHandler}>
      <p>
        {title}
      </p>
    </div>
  );
};

export default DownloadDocumentation;