import React, { FC, useState } from 'react';
import { NewsArticles } from '@/constants/interfaces/newsArticles';
import CustomButton from '@components/button/CustomButton.tsx';
import CustomInput from '@components/input/CustomInput.tsx';
import { deleteNewsArticle, editNewsArticle } from '@/api/manager/newsArticle';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { showMessage } from '@/store/reducers/StatusReducer.ts';

const NewsArticleComponent: FC<NewsArticles> = ({ photo, title, newsArticle, _id }) => {
  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentNewsArticle, setCurrentNewsArticle] = useState(newsArticle);

  const [newTitle, setNewTitle] = useState(title);
  const [newNewsArticle, setNewNewsArticle] = useState(newsArticle);

  const changeHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<any>) => {
      setState(e.target.value);
    };
  };

  const saveHandler = () => {
    if (!access_token) return;
    editNewsArticle(access_token, {
      id: _id,
      newsArticle: newNewsArticle,
      title: newTitle,
    }).then(() => {
      setCurrentTitle(newTitle);
      setCurrentNewsArticle(newNewsArticle);
      setEdit(false);
    });
  };

  const deleteHandler = () => {
    if (!access_token) return;

    deleteNewsArticle(access_token, _id).then(() => {
      dispatch(showMessage('News article was successfully deleted'));

      setIsDeleted(true);
    });
  };
  if (isDeleted) return <></>;

  const styles = 'w-full mt-5';

  return (
    <div className={'flex flex-col w-1/6'}>
      <div className={'flex flex-col items-center min-h-[350px]'}>
        <img className={'min-h-fit'} src={photo} alt="" />
        {edit ? (
          <>
            <CustomInput value={newTitle} onChange={changeHandler(setNewTitle)}>
              Title
            </CustomInput>
            <CustomInput value={newNewsArticle} onChange={changeHandler(setNewNewsArticle)}>
              News Article
            </CustomInput>
          </>
        ) : (
          <>
            <p className="font-bold">{currentTitle}</p>
            <p>{currentNewsArticle}</p>
          </>
        )}
      </div>

      <div className={'flex flex-col gap-5 mt-6 w-full'}>
        <CustomButton title={'edit'} styles={styles} handler={() => setEdit(!edit)} />
        {edit && <CustomButton title={'save'} styles={styles} handler={saveHandler} />}
        {edit && <CustomButton title={'delete'} styles={styles} handler={deleteHandler} bgColor={'red'} />}
      </div>
    </div>
  );
};

export default NewsArticleComponent;
