import React, {FC, useState} from 'react';
import {Events} from '@/constants/interfaces/events.ts';
import CustomButton from '@components/button/CustomButton.tsx';
import CustomInput from '@components/input/CustomInput.tsx';
import {deleteEvent, patchEvent} from '@/api/manager/event.ts';
import {useAppDispatch, useAppSelector} from '@/store/hooks/hooks.ts';
import {showMessage} from '@/store/reducers/StatusReducer.ts';

const EventComponent: FC<Events> = ({photo, title, announcement, _id}) => {
    const {access_token} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [edit, setEdit] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    const [currentTitle, setCurrentTitle] = useState(title)
    const [currentAnnouncement, setCurrentAnnouncement] = useState(announcement)

    const [newTitle, setNewTitle] = useState(title)
    const [newAnnouncement, setNewAnnouncement] = useState(announcement)

    const changeHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {

        return (e: React.ChangeEvent<any>) => {
            setState(e.target.value)
        }
    }

    const saveHandler = () => {
        if (!access_token) return
        patchEvent(access_token, {
            id: _id,
            announcement: newAnnouncement,
            title: newTitle
        }).then(() => {
            setCurrentTitle(newTitle)
            setCurrentAnnouncement(newAnnouncement)
            setEdit(false)
        })
    }

    const deleteHandler = () => {
        if (!access_token) return

        deleteEvent(access_token, _id).then(() => {
            dispatch(showMessage('Event was successfully deleted'))

            setIsDeleted(true)
        })
    }
    if (isDeleted) return <></>

    const styles = 'w-full mt-5'

    return (
        <div className={'flex flex-col w-1/6'}>
            <div className={'flex flex-col items-center min-h-[350px]'}>
                <img className={'min-h-fit'} src={photo} alt=""/>
                {edit ?
                  <>
                      <CustomInput value={newTitle} onChange={changeHandler(setNewTitle)}>Title</CustomInput>
                      <CustomInput value={newAnnouncement}
                                   onChange={changeHandler(setNewAnnouncement)}>Announcement</CustomInput>
                  </>

                  : <>
                      <p className="font-bold">{currentTitle}</p>
                      <p>{currentAnnouncement}</p>
                  </>
                }
            </div>


            <div className={'flex flex-col gap-5 mt-6 w-full'}>
                <CustomButton title={'edit'} styles={styles} handler={() => setEdit(!edit)}/>
                {edit && <CustomButton title={'save'} styles={styles} handler={saveHandler}/>}
                {edit && <CustomButton title={'delete'} styles={styles} handler={deleteHandler} bgColor={'red'}/>}
            </div>
        </div>
    );
};

export default EventComponent;
