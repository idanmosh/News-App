import {
  ADD_FAVORITE,
  HIDE_MODAL,
  REMOVE_FAVORITE,
  SET_USER,
  SHOW_MODAL,
} from './actionTypes';
import { NewProps } from '../Reducers/NewsReducer';
import { UserState } from '../Reducers/UserReducer';
import { ModalProps } from '../Reducers/AppReducer';

export const addFavorite = (payload: NewProps) => ({
  type: ADD_FAVORITE,
  payload,
});

export const removeFavorite = (payload: NewProps) => ({
  type: REMOVE_FAVORITE,
  payload,
});

export const setUser = (payload: UserState['user']) => ({
  type: SET_USER,
  payload,
});

export const showModal = (payload: ModalProps) => ({
  type: SHOW_MODAL,
  payload,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});
