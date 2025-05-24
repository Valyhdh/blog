import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../store';
import { logoutUser, UserType } from '../../store/articleSlice';

import classes from './Header.module.scss';

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.article);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log('render header');
  useEffect(() => {
    setIsLoaded(true);

    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    <header className={!isLoaded ? classes['header'] : `${classes['header']} ${classes['header__loaded']}`}>
      {user ? <Login user={user} /> : <Logout />}
    </header>
  );
};

const Logout: React.FC = () => {
  return (
    <React.Fragment>
      <Link to="/articles" className={classes['header__title']}>
        Realworld Blog
      </Link>
      <section className={classes['header-authentication']}>
        <Link to="/sign-in" className={classes['header-authentication__sign-in']}>
          Sign In
        </Link>
        <Link to="/sign-up" className={classes['header-authentication__sign-up']}>
          Sign Up
        </Link>
      </section>
    </React.Fragment>
  );
};

interface LoginProps {
  user: UserType;
}

const Login: React.FC<LoginProps> = ({ user }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <React.Fragment>
      <Link to="/articles" className={classes['header__title']}>
        Realworld Blog
      </Link>
      <section className={classes['header-authentication']}>
        <Link to="/new-article" className={classes['header-authentication__create']}>
          Create article
        </Link>
        <Link to="/profile" className={classes['header-authentication__profile']}>
          <p>{user.username}</p>
          <img src={user.image} alt="" />
        </Link>
        <button onClick={() => dispatch(logoutUser())} className={classes['header-authentication__log-out']}>
          Log Out
        </button>
      </section>
    </React.Fragment>
  );
};

export default Header;
