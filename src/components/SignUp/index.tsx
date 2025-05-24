import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { AppDispatch, RootState } from '../../store';
import { createAccount } from '../../store/articleSlice';

import classes from './SignUp.module.scss';

const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.article);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [equalityPassword, setEqualityPassword] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const Account = {
      user: {
        username,
        email,
        password,
      },
    };
    if (password === passwordRepeat) {
      setEqualityPassword(true);
      dispatch(createAccount(Account));
    } else {
      setEqualityPassword(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${classes['create-account']} ${isLoaded ? 'form__loaded' : ''}`}>
      <h2 className={'form__title'}>{loading ? <Spin className={'form__loader'} /> : 'Create new account'}</h2>
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
        <label className={'form__label'}>Password</label>
        <input
          pattern="\w{6,40}"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={equalityPassword ? 'form__input' : 'form__input_invalid'}
        />
        {!equalityPassword ? (
          <p className={'form__input_invalid_warning'}>Your password needs to be at least 6 characters.</p>
        ) : null}
      </div>
      <div className={'form__field'}>
        <label className={'form__label'}>Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat Password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          required
          className={equalityPassword ? 'form__input' : 'form__input_invalid'}
        />
        {!equalityPassword ? <p className={'form__input_invalid_warning'}>Passwords must match</p> : null}
      </div>
      <hr className={'outline'}></hr>
      <div className={'form__confirmation'}>
        <label>I agree to the processing of my personal information</label>
        <input type="checkbox" required />
      </div>
      {!error ? (
        <React.Fragment>
          <button type="submit" className={'form__button'}>
            Create
          </button>
          <p className={'form__to-sign-in'}>
            Already have an account?
            <Link to="/sign-in" className={'form__to-sign-in_link'}>
              Sign In.
            </Link>
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button type="submit" className={`${['form__button']} ${['form__button_error']}`}>
            Create
          </button>
          <p className={'form__error-message'}>such a user already exists or the data is incorrect</p>
        </React.Fragment>
      )}
    </form>
  );
};

export default SignUp;
