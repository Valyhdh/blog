import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { AppDispatch, RootState } from '../../store';
import { loginAccount } from '../../store/articleSlice';

import classes from './SignIn.module.scss';

const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.article);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const Account = {
      user: {
        email,
        password,
      },
    };
    dispatch(loginAccount(Account));
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${classes['login-account']} ${isLoaded ? 'form__loaded' : ''}`}>
      <h2 className={'form__title'}>{loading ? <Spin className={'form__loader'} /> : 'Sign In'}</h2>
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
        <label className={'form__label'}>Password</label>
        <input
          pattern="\w{6,40}"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={'form__input'}
        />
      </div>
      {user ? (
        <div className={'form__alert'}>You are already logged in</div>
      ) : error ? (
        <React.Fragment>
          <button type="submit" className={`${['form__button']} ${['form__button_error']}`}>
            login
          </button>
          <p className={'form__error-message'}>The password or login is not entered correctly.</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button type="submit" className={'form__button'}>
            login
          </button>
          <p className={'form__to-sign-up'}>
            Don’t have an account?{' '}
            <Link to="/sign-up" className={'form__to-sign-up_link'}>
              Sign Up.
            </Link>
          </p>
        </React.Fragment>
      )}
    </form>
  );
};

export default SignIn;
