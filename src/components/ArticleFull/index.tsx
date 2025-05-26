import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import Markdown from 'react-markdown';

import { deleteArticle, getArticle, resetArticle } from '../../store/articleSlice';
import { AppDispatch, RootState } from '../../store';
import { Loader } from '../ArticleList';
import { ArticleTags } from '../Article';

import classes from './ArticleFull.module.scss';

const ArticleFull: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { article, user } = useSelector((state: RootState) => state.article, shallowEqual);
  const { slug } = useParams<{ slug: string }>();

  const [onDelete, setOnDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);
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
  if (deleted) {
    return <article className={classes['article']}>Delete</article>;
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
              <button
                className={classes['button-del']}
                onClick={() => {
                  setOnDelete(!onDelete);
                }}
              >
                Delete
              </button>
              <Link to="edit" className={classes['button-edit']}>
                Edit
              </Link>
              {onDelete ? (
                <div className={classes['modal-delete']}>
                  <p className={classes['modal-delete__title']}>Are you sure to delete this article?</p>
                  <div className={classes['modal-delete__confirm']}>
                    <button
                      className={classes['modal-delete__confirm_no']}
                      onClick={() => {
                        setOnDelete(false);
                      }}
                    >
                      No
                    </button>
                    <button
                      className={classes['modal-delete__confirm_yes']}
                      onClick={() => {
                        dispatch(deleteArticle(slug!));
                        setDeleted(true);
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              ) : null}
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
