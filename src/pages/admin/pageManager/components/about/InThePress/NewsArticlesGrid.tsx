import React, { FC } from 'react';
import { NewsArticles } from '@/constants/interfaces/newsArticles';
import NewsArticleComponent from '@/pages/admin/pageManager/components/about/InThePress/NewsArticleComponent';

const NewsArticlesGrid: FC<{ newsArticles: NewsArticles[] }> = ({ newsArticles }) => {
  return (
    <div className={'flex flex-row flex-wrap gap-8'}>
      {newsArticles.map((newsArticle) => {
        return <NewsArticleComponent key={newsArticle._id} {...newsArticle} />;
      })}
    </div>
  );
};

export default NewsArticlesGrid;
