import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';

import ArticleList from './components/ArticleList';
import ArticleFull from './components/ArticleFull';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" Component={ArticleList} />
        <Route path="/articles" Component={ArticleList} />
        <Route path="/articles/:slug" Component={ArticleFull} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/sign-in" Component={SignIn} />
      </Routes>
    </React.Fragment>
  );
}
