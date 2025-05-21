import React from 'react';
import { Tag } from 'antd';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

import { ArticleType } from '../../store/articleSlice';

import classes from './Article.module.scss';

interface ArticleProps {
  art: ArticleType;
}

const Article: React.FC<ArticleProps> = ({ art }) => {
  const {
    slug,
    title,
    description,
    author: { image, username },
    createdAt,
    favoritesCount,
    tagList,
  } = art;

  return (
    <article className={classes['article']}>
      <section className={classes['header']}>
        <section className={classes['info']}>
          <div className={classes['info__name']}>
            <Link to={`/articles/${slug}`} className={classes['info__title']}>
              {title}
            </Link>
            <button className={classes['info__favorites-count']}>{favoritesCount}</button>
          </div>
          <div className={classes['info__tags']}>{tagList ? <ArticleTags tags={tagList} slug={slug} /> : null}</div>
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
