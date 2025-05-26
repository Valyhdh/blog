import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '../../store';
import { CreateArticle, editArticle, getArticle, resetArticle } from '../../store/articleSlice';

import classes from './NewArticle.module.scss';

interface NewArticleProps {
  onEdit: boolean;
}

const NewArticle: React.FC<NewArticleProps> = ({ onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, article } = useSelector((state: RootState) => state.article, shallowEqual);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState(['']);
  const [isLoaded, setIsLoaded] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug && onEdit) {
      dispatch(getArticle(slug)).catch((error) => {
        console.error('Error fetching article:', error);
      });

      return () => {
        dispatch(resetArticle());
      };
    }
  }, [dispatch, slug, onEdit]);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description);
      setText(article.body);
      setTags(article.tagList);
    }
  }, [article]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...tags];
    newInputs[index] = value;
    setTags(newInputs);
  };

  const addInput = () => {
    setTags([...tags, '']);
  };

  const deleteInput = (index: number) => {
    const newInputs = tags.filter((_, i) => i !== index);
    setTags(newInputs);
  };
  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const artilceNew = {
      article: {
        title,
        description,
        body: text,
        tagList: tags,
      },
    };
    dispatch(CreateArticle(artilceNew));
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const artilceNew = {
      article: {
        title,
        description,
        body: text,
        tagList: tags,
      },
    };
    if (slug) {
      dispatch(editArticle({ article: artilceNew, slug }));
    }
  };

  return (
    <form
      onSubmit={onEdit ? handleSubmitEdit : handleSubmitCreate}
      className={`form ${classes['create-article']} ${isLoaded ? 'form__loaded' : ''}`}
    >
      <h2 className={`form__title ${classes['create-article__title']}`}>
        {loading ? <Spin className={'form__loader'} /> : onEdit ? 'Edit article' : 'Create new article'}
      </h2>
      <div className={`form__field ${classes['create-article__field']}`}>
        <label className={'form__label'}>Title</label>
        <input
          pattern="\w{3,20}"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={'form__input'}
        />
      </div>
      <div className={`form__field ${classes['create-article__field']}`}>
        <label className={'form__label'}>Short description</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={'form__input'}
        />
      </div>
      <div className={`form__field ${classes['create-article__field']}`}>
        <label className={'form__label'}>Text</label>
        <textarea
          autoComplete="off"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className={`form__input ${classes['create-article__input_text']}`}
        />
      </div>
      <div className={classes['create-article__field_tags']}>
        <div className={'form__field'}>
          <label className={'form__label'}>Tags</label>
          {tags.map((input, index) => (
            <div key={index} className={classes['create-article_tags']}>
              <input
                className={`form__input ${classes['create-article__input_tag']}`}
                type="text"
                required
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={`Tag ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => deleteInput(index)}
                className={classes['create-article__button_tags-del']}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addInput} className={classes['create-article__button_tags']}>
          Add tag
        </button>
      </div>

      {user ? (
        <button type="submit" className={`form__button ${classes['create-article__button']}`}>
          Send
        </button>
      ) : (
        <p className={'form__alert'}>you can&prime;t create a new article, please log in.</p>
      )}
    </form>
  );
};

export default NewArticle;
