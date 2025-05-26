import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';

import ArticleList from './components/ArticleList';
import ArticleFull from './components/ArticleFull';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import EditProfile from './components/EditProfile';
import NewArticle from './components/NewArticle';

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" Component={ArticleList} />
        <Route path="/articles" Component={ArticleList} />
        <Route path="/articles/:slug/" Component={ArticleFull} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/profile" Component={EditProfile} />
        <Route path="/new-article" element={<NewArticle onEdit={false} />} />
        <Route path="/articles/:slug/edit" element={<NewArticle onEdit={true} />} />
      </Routes>
    </React.Fragment>
  );
}
