import React from 'react';
import { Tag } from 'antd';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { ArticleType, favoriteArticle, getArticles, unfavoriteArticle } from '../../store/articleSlice';

import classes from './Article.module.scss';

interface ArticleProps {
  art: ArticleType;
  page: number;
}

const Article: React.FC<ArticleProps> = ({ art, page }) => {
  const dispatch: AppDispatch = useDispatch();

  const {
    slug: slugArticle,
    title,
    description,
    author: { image, username },
    createdAt,
    favoritesCount,
    favorited,
    tagList,
  } = art;

  const handleFavorite = () => {
    if (!favorited) {
      dispatch(favoriteArticle(slugArticle));
      dispatch(getArticles((page - 1) * 5));
    } else {
      dispatch(unfavoriteArticle(slugArticle));
      dispatch(getArticles((page - 1) * 5));
    }
  };

  return (
    <article className={classes['article']}>
      <section className={classes['header']}>
        <section className={classes['info']}>
          <div className={classes['info__name']}>
            <Link to={`/articles/${slugArticle}`} className={classes['info__title']}>
              {title}
            </Link>
            <button className={classes['info__favorites-count']} onClick={handleFavorite}>
              {favoritesCount}
            </button>
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
        <p className={classes['content__description']}>{description}</p>
      </section>
    </article>
  );
};

export default Article;

interface ArticleTagsProps {
  tags: string[];
  slug: string;
}

export const ArticleTags: React.FC<ArticleTagsProps> = ({ tags, slug }) => {
  return (
    <React.Fragment>
      {tags.map((tag, index) => {
        if (tag) {
          return <Tag key={slug + tag + index}>{tag}</Tag>;
        }
      })}
    </React.Fragment>
  );
};
