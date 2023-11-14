import { useEffect, useState } from 'react';
import CustomButton from '@components/button/CustomButton.tsx';
import { useNavigate } from 'react-router';
import NewsArticlesGrid from '@/pages/admin/pageManager/components/about/InThePress/NewsArticlesGrid';
import { NewsArticles } from '@/constants/interfaces/newsArticles';
import { getNewsArticles } from '@/api/manager/newsArticle';

const NewsArticlesBlock = () => {
  const navigate = useNavigate();
  const [newsArticles, setNewsArticles] = useState<NewsArticles[]>();

  useEffect(() => {
    getNewsArticles().then((res) => {
      setNewsArticles(res.data);
    });
  }, []);

  if (!newsArticles) return;
  const buttonHandler = () => {
    navigate('/admin/createnewsarticle');
  };
  return (
    <div className={'flex flex-col gap-12'}>
      <div className={'flex flex-row justify-between'}>
        <h1 className={'text-xl font-bold'}>News Articles</h1>
        <CustomButton styles={'!px-12'} title={'+  Add New'} handler={buttonHandler} />
      </div>
      <NewsArticlesGrid newsArticles={newsArticles} />
    </div>
  );
};

export default NewsArticlesBlock;
