import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import Markdown from 'react-markdown';

import { getArticle, resetArticle } from '../../store/articleSlice';
import { AppDispatch, RootState } from '../../store';
import { Loader } from '../ArticleList';
import { ArticleTags } from '../Article';

import classes from './ArticleFull.module.scss';

const ArticleFull: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { article, user } = useSelector((state: RootState) => state.article, shallowEqual);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug) {
      dispatch(getArticle(slug));

      return () => {
        dispatch(resetArticle());
      };
    }
  }, [dispatch, slug]);

  if (!article) {
    return <Loader />;
  }

  const {
    slug: slugArticle,
    title,
    description,
    body,
    author: { image, username },
    createdAt,
    favoritesCount,
    tagList,
  } = article;

  return (
    <article className={classes['article']}>
      <section className={classes['header']}>
        <section className={classes['info']}>
          <div className={classes['info__name']}>
            <h2 className={classes['info__title']}>{title}</h2>
            <button className={classes['info__favorites-count']}>{favoritesCount}</button>
          </div>
          <div className={classes['info__tags']}>
            {tagList ? <ArticleTags tags={tagList} slug={slugArticle} /> : null}
          </div>
        </section>
        <section className={classes['author']}>
          <div className={classes['author-info']}>
            <p className={classes['author-info__name']}>{username}</p>
            <p className={classes['author-info__created']}>{format(parseISO(createdAt), 'MMM dd, yyyy')}</p>
          </div>
          <img src={image} alt="avatar" className={classes['author-avatar']} />
        </section>
      </section>
      <section className={classes['content']}>
        <div className={classes['content__wrapper']}>
          <p className={classes['content__description']}>{description}</p>
          {user?.username === username ? (
            <div className={classes['buttons']}>
              <button className={classes['button-del']}>Delete</button>
              <button className={classes['button-edit']}>Edit</button>
            </div>
          ) : null}
        </div>

        <div className={classes['content__body']}>
          <Markdown>{body}</Markdown>
        </div>
      </section>
    </article>
  );
};

export default ArticleFull;
