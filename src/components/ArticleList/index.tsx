import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
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
  const { loading } = useSelector((state: RootState) => state.article, shallowEqual);

  useEffect(() => {
    dispatch(getArticles((page - 1) * 5));
  }, [dispatch, page]);

  if (loading) {
    return <Loader />;
  }

  return (
    <article className={classes['article-list']}>
      <List setPage={setPage} page={page} />
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
        return <Article key={art.slug} art={art} page={page} />;
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
