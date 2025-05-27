import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getArticles = createAsyncThunk('articles/getArticles', async (offset: number) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles?limit=5&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const art: ArticleType[] = data.articles;
    const artCount: number = data.articlesCount;

    console.log(art, artCount);

    return { articles: art, articlesCount: artCount };
  } catch (error) {
    console.error('Error get articles:', error);
    throw error;
  }
});

export const getArticle = createAsyncThunk('articles/getArticle', async (slug: string | undefined) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const art: ArticleType = data.article;
    console.log(art);
    return art;
  } catch (error) {
    console.error('Error get this article:', error);
    throw error;
  }
});

export const createAccount = createAsyncThunk('account/createAccount', async (body: CreateAccountType) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.user;
  } catch (error) {
    console.error('Error create account:', error);
    throw error;
  }
});

export const loginAccount = createAsyncThunk('account/loginAccount', async (body: LoginAccountType) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.user);
    return data.user;
  } catch (error) {
    console.error('Error login account:', error);
    throw error;
  }
});

export const editAccount = createAsyncThunk('account/getAccount', async (date: EditUserType) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${initialState.user?.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(date),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.user);
    return data.user;
  } catch (error) {
    console.error('Error get account:', error);
    throw error;
  }
});

export const CreateArticle = createAsyncThunk('articles/createArticle', async (date: CreateArticleType) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: { Authorization: `Bearer ${initialState.user?.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(date),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error create article:', error);
    throw error;
  }
});

export const editArticle = createAsyncThunk(
  'articles/editArticle',
  async ({ article, slug }: { article: CreateArticleType; slug: string }) => {
    console.log(JSON.stringify(article));
    try {
      const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${initialState.user?.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error edit article:', error);
      throw error;
    }
  }
);

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (slug: string) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${initialState.user?.token}` },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data.user;
  } catch (error) {
    console.error('Error delete article:', error);
    throw error;
  }
});

export const favoriteArticle = createAsyncThunk('articles/favoriteArticle', async (slug: string) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${initialState.user?.token}` },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error favorite article:', error);
    throw error;
  }
});

export const unfavoriteArticle = createAsyncThunk('articles/unfavoriteArticle', async (slug: string) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${initialState.user?.token}` },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error unfavorite article:', error);
    throw error;
  }
});

type LoginAccountType = {
  user: {
    email: string;
    password: string;
  };
};

type CreateArticleType = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
};

type CreateAccountType = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type UserType = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

type EditUserType = {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string;
  };
};

export type ArticleType = {
  body: string;
  slug: string;
  tagList: string[];
  title: string;
  author: {
    bio: string;
    image: string;
    username: string;
    following: boolean;
  };
  createdAt: string;
  favorited: boolean;
  updatedAt: string;
  description: string;
  favoritesCount: number;
};

interface IArticleState {
  error: boolean;
  loading: boolean;
  articles: ArticleType[];
  article: ArticleType | null;
  articlesCount: number;
  user: UserType | null;
}

const userData = localStorage.getItem('user');

const initialState: IArticleState = {
  error: false,
  loading: false,
  articles: [],
  article: null,
  articlesCount: 0,
  user: userData ? JSON.parse(userData) : null,
};

const articleSlice = createSlice({
  name: 'articleSlice',
  initialState,
  reducers: {
    resetArticle: (state) => {
      state.article = null;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(getArticles.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getArticle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.article = action.payload;
      })
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        console.log(state.user);
      })
      .addCase(createAccount.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(loginAccount.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginAccount.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editAccount.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        console.log(state.user);
      })
      .addCase(editAccount.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(CreateArticle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(CreateArticle.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(CreateArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editArticle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editArticle.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(editArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(favoriteArticle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(favoriteArticle.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(favoriteArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(unfavoriteArticle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(unfavoriteArticle.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(unfavoriteArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetArticle, logoutUser } = articleSlice.actions;

export default articleSlice.reducer;
