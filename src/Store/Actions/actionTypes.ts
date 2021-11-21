import { UserState } from '../Reducers/UserReducer';
import { NewProps } from '../Reducers/NewsReducer';

//Categories
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';

//Favorites
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

//Google
export const GOOGLE_SIGN_IN = 'GOOGLE_SIGN_IN';
export const GOOGLE_SIGN_OUT = 'GOOGLE_SIGN_OUT';

//User
export const SET_LOGIN_PROGRESS = 'SET_LOGIN_PROGRESS';
export const SET_USER = 'SET_USER';

//App Modal
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

//Favorites Reducer Actions
export interface AddFavorite {
  type: typeof ADD_FAVORITE;
  payload: NewProps;
}

export interface RemoveFavorite {
  type: typeof REMOVE_FAVORITE;
  payload: NewProps;
}

export interface SetCategories {
  type: typeof SET_CATEGORIES;
  payload: {
    business: Array<NewProps>;
    entertainment: Array<NewProps>;
    general: Array<NewProps>;
    health: Array<NewProps>;
    science: Array<NewProps>;
    sports: Array<NewProps>;
    technology: Array<NewProps>;
  };
}

//User Reducer Actions
export interface SetLoginProgress {
  type: typeof SET_LOGIN_PROGRESS;
  payload: boolean;
}

export interface SetUser {
  type: typeof SET_USER;
  payload: UserState['user'];
}
