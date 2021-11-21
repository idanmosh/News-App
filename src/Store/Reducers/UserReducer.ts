import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import produce from 'immer';
import {
  SetLoginProgress,
  SetUser,
  SET_LOGIN_PROGRESS,
  SET_USER,
} from '../Actions/actionTypes';

export interface UserState {
  user: FirebaseAuthTypes.User | null;
  isLoggedIn: boolean;
  loginInProgress: boolean;
}

type UserReducerActionTypes = SetLoginProgress | SetUser;

const INITIAL_STATE: UserState = {
  user: null,
  isLoggedIn: false,
  loginInProgress: false,
};

export default produce((draft, action: UserReducerActionTypes) => {
  switch (action.type) {
    case SET_LOGIN_PROGRESS: {
      draft.loginInProgress = action.payload;
      return draft;
    }
    case SET_USER: {
      draft.user = action.payload;
      draft.isLoggedIn = action.payload !== null;
      return draft;
    }
    default:
      return draft;
  }
}, INITIAL_STATE);
