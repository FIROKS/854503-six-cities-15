import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Endpoints, AppRoute } from '../../const';
import { saveToken, dropToken } from '../../services/token';
import { AppDispatch, UserData, AuthData, State } from '../../types';
import { redirectToRoute } from '../actions';
import { fetchFavoriteOffersAction } from '../offers-process/offers-process.thunks';
import { clearFavoriteOffers } from '../offers-process/offers-process.slice';

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(Endpoints.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(Endpoints.Login, {email, password});

    saveToken(data.token);
    dispatch(fetchFavoriteOffersAction());
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(Endpoints.Logout);

    dispatch(clearFavoriteOffers());
    dropToken();
  }
);
