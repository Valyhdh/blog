import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Article from '../Article';
import { getArticles } from '../../store/articleSlice';
import { RootState, AppDispatch } from '../../store';

import classes from './ArticleList.module.scss';
const ArticleList: React.FC = () => {
  const [page, setPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.article);

  useEffect(() => {
    dispatch(getArticles((page - 1) * 5));
  }, [dispatch, page]);

  return (
    <article className={classes['article-list']}>
      {loading ? <Loader /> : <List setPage={setPage} page={page} />}
    </article>
  );
};

export const Loader: React.FC = () => (
  <Spin indicator={<LoadingOutlined spin />} size="large" className={classes['article-list__loader']} />
);

interface ListProps {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}

const List: React.FC<ListProps> = ({ setPage, page }) => {
  const { articles, articlesCount } = useSelector((state: RootState) => state.article);

  const onChange: PaginationProps['onChange'] = (pageArt) => {
    setPage(pageArt);
  };

  return (
    <React.Fragment>
      {articles.map((art) => {
        return <Article key={art.slug} art={art} />;
      })}
      <Pagination
        current={page}
        onChange={onChange}
        total={articlesCount}
        defaultPageSize={5}
        showSizeChanger={false}
        className={classes['article-list__pagination']}
      />
    </React.Fragment>
  );
};

export default ArticleList;
