import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { AppDispatch, RootState } from '../../store';
import { CreateArticle } from '../../store/articleSlice';

import classes from './NewArticle.module.scss';

const NewArticle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.article);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState(['']);
  const [isLoaded, setIsLoaded] = useState(false);

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const artilce = {
      article: {
        title,
        description,
        body: text,
        tags,
      },
    };
    dispatch(CreateArticle(artilce));
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${classes['create-article']} ${isLoaded ? 'form__loaded' : ''}`}>
      <h2 className={`form__title ${classes['create-article__title']}`}>
        {loading ? <Spin className={'form__loader'} /> : 'Create new article'}
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
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={`Tag ${index + 1}`}
              />
              {tags.length !== 1 ? (
                <button
                  type="button"
                  onClick={() => deleteInput(index)}
                  className={classes['create-article__button_tags-del']}
                >
                  Delete
                </button>
              ) : null}
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
