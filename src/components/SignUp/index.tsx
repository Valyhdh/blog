import React, { useState } from 'react';
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
    <form onSubmit={handleSubmit} className={classes['create-account']}>
      <h2 className={classes['create-account__title']}>
        {loading ? <Spin className={classes['create-account__loader']} /> : 'Create new account'}
      </h2>
      <div className={classes['create-account__field']}>
        <label className={classes['create-account__label']}>Username</label>
        <input
          pattern="\w{3,20}"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={classes['create-account__input']}
        />
      </div>
      <div className={classes['create-account__field']}>
        <label className={classes['create-account__label']}>Email address</label>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={classes['create-account__input']}
        />
      </div>
      <div className={classes['create-account__field']}>
        <label className={classes['create-account__label']}>Password</label>
        <input
          pattern="\w{6,40}"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={equalityPassword ? classes['create-account__input'] : classes['create-account__input_invalid']}
        />
        {!equalityPassword ? (
          <p className={classes['create-account__input_invalid_warning']}>
            Your password needs to be at least 6 characters.
          </p>
        ) : null}
      </div>
      <div className={classes['create-account__field']}>
        <label className={classes['create-account__label']}>Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat Password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          required
          className={equalityPassword ? classes['create-account__input'] : classes['create-account__input_invalid']}
        />
        {!equalityPassword ? (
          <p className={classes['create-account__input_invalid_warning']}>Passwords must match</p>
        ) : null}
      </div>
      <hr className={classes['outline']}></hr>
      <div className={classes['create-account__confirmation']}>
        <label>I agree to the processing of my personal information</label>
        <input type="checkbox" required />
      </div>
      {!error ? (
        <React.Fragment>
          <button type="submit" className={classes['create-account__button']}>
            Create
          </button>
          <p className={classes['create-account__to-sign-in']}>
            Already have an account?
            <Link to="/sign-in" className={classes['create-account__to-sign-in_link']}>
              Sign In.
            </Link>
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button
            type="submit"
            className={`${classes['create-account__button']} ${classes['create-account__button_error']}`}
          >
            Create
          </button>
          <p className={classes['create-account__error-message']}>
            such a user already exists or the data is incorrect
          </p>
        </React.Fragment>
      )}
    </form>
  );
};

export default SignUp;
