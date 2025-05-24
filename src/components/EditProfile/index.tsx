import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { editAccount } from '../../store/articleSlice';
import { AppDispatch, RootState } from '../../store';

import classes from './EditProfile.module.scss';

const EditProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.article);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setBio(user.bio);
      setImage(user.image);
    } else {
      setUsername('');
      setEmail('');
      setBio('');
      setImage(' ');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const Account = {
      user: {
        username,
        email,
        bio,
        image,
      },
    };
    dispatch(editAccount(Account));
  };

  return (
    <form onSubmit={handleSubmit} className={`form  ${classes['edit-profile']} ${isLoaded ? 'form__loaded' : ''}`}>
      <h2 className={'form__title'}>{loading ? <Spin className={'form__loader'} /> : 'Edit Profile'}</h2>
      <div className={'form__field'}>
        <label className={'form__label'}>Username</label>
        <input
          pattern="\w{3,20}"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={'form__input'}
        />
      </div>
      <div className={'form__field'}>
        <label className={'form__label'}>Email address</label>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={'form__input'}
        />
      </div>
      <div className={'form__field'}>
        <label className={'form__label'}>Biography</label>
        <input
          autoComplete="off"
          type="text"
          placeholder="Biography"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
          className={'form__input'}
        />
      </div>
      <div className={'form__field'}>
        <label className={'form__label'}>Avatar image (url)</label>
        <input
          type="url"
          placeholder="Avatar image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className={'form__input'}
        />
      </div>
      {user ? (
        <button type="submit" className={'form__button'}>
          Save
        </button>
      ) : (
        <p className={'form__alert'}>You have logged out of your account, please log in.</p>
      )}
    </form>
  );
};

export default EditProfile;
