import produce from 'immer';
import {
  AddFavorite,
  ADD_FAVORITE,
  RemoveFavorite,
  REMOVE_FAVORITE,
  SetCategories,
  SET_CATEGORIES,
} from '../Actions/actionTypes';

export interface NewProps {
  author: string | null;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string | null;
  category: string;
  language: string;
  country: string;
  published_at: string;
}

export interface NewsState {
  business: Array<NewProps>;
  entertainment: Array<NewProps>;
  general: Array<NewProps>;
  health: Array<NewProps>;
  science: Array<NewProps>;
  sports: Array<NewProps>;
  technology: Array<NewProps>;
  favorites: Array<NewProps>;
}

type NewsReducerActionTypes = AddFavorite | RemoveFavorite | SetCategories;

const INITIAL_STATE: NewsState = {
  business: [],
  entertainment: [],
  general: [],
  health: [],
  science: [],
  sports: [],
  technology: [],
  favorites: [],
};

export default produce((draft, action: NewsReducerActionTypes) => {
  switch (action.type) {
    case ADD_FAVORITE: {
      draft.favorites.push(action.payload);
      return draft;
    }
    case REMOVE_FAVORITE: {
      draft.favorites = draft.favorites.filter(
        (item) => item.url !== action.payload.url,
      );
      return draft;
    }
    case SET_CATEGORIES: {
      Object.keys(action.payload).forEach((key) => {
        draft[key] = action.payload[key];
      });
      return draft;
    }
    default:
      return draft;
  }
}, INITIAL_STATE);
