import createSensitiveStorage from 'redux-persist-sensitive-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { createTransform, persistReducer } from 'redux-persist';
import UserReducer from './UserReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import NewsReducer from './NewsReducer';
import pick from 'lodash/pick';
import AppReducer from './AppReducer';

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
});

const persistUserConfig = {
  key: 'UserReducer',
  storage: sensitiveStorage,
  whitelist: ['user'],
  version: 2,
};

const rootReducer = combineReducers({
  UserReducer: persistReducer(persistUserConfig, UserReducer),
  NewsReducer,
  AppReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const createFilter = (name: keyof RootState, ...args: string[]) => {
  return createTransform(
    (inboundState) => (inboundState ? pick(inboundState, args) : inboundState),
    undefined,
    {
      whitelist: [name.toString()],
    },
  );
};

const newsTransform = createFilter('NewsReducer', 'favorites');

const appTransform = createFilter('AppReducer');

const userTransform = createFilter('UserReducer', 'isLoggedIn');

export const transforms = [newsTransform, appTransform, userTransform];

export default persistReducer(
  {
    key: 'main',
    storage: AsyncStorage,
    transforms,
    stateReconciler: autoMergeLevel2,
  },
  rootReducer,
);
