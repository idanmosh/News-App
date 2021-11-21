import React, { useEffect } from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import Home from '../Components/Screens/Home';
import { headerBase } from './Commons';
import { NewProps } from 'Store/Reducers/NewsReducer';
import CategoryNews from '../Components/Screens/CategoryNews';
import { Pressable, Text } from 'react-native';
import Icon from '../Components/Common/Icon';
import Favorites from '../Components/Screens/Favorites';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../Store/Reducers/UserReducer';
import { setUser } from '../Store/Actions/actionCreators';
import { RootState } from '../Store/Reducers';
import { calcSize } from '../Utils';
import { HIT_SLOP_10, ORANGE } from '../Constants';
import { GOOGLE_SIGN_OUT } from '../Store/Actions/actionTypes';
import WebView from '../Components/Screens/WebView';

export type RootStackParam = {
  Home: undefined;
  CategoryNews: {
    data: Array<NewProps>;
    title: string;
  };
  Favorites: undefined;
  GoogleLogin: undefined;
  WebView: {
    url: string;
    title: string;
  };
};

export type HomeScreenProps = StackScreenProps<RootStackParam, 'Home'>;

export type CategoryNewsScreenProps = StackScreenProps<
  RootStackParam,
  'CategoryNews'
>;

export type WebViewScreenProps = StackScreenProps<RootStackParam, 'WebView'>;

export type FavoritesScreenProps = StackScreenProps<
  RootStackParam,
  'Favorites'
>;

const Stack = createStackNavigator<RootStackParam>();

const Routes = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state: RootState) => state.UserReducer);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = (user: UserState['user']) =>
    dispatch(setUser(user));

  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="float"
      screenOptions={headerBase}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }: HomeScreenProps) => ({
          title: 'News Categories',
          headerLeft: () => (
            <Pressable
              hitSlop={HIT_SLOP_10}
              onPress={() => navigation.navigate('Favorites')}>
              <Icon size={22} source={require('../Assets/likes.png')} />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="CategoryNews"
        component={CategoryNews}
        options={({ route }: CategoryNewsScreenProps) => ({
          title: route.params.title || '',
        })}
      />
      <Stack.Screen
        name="WebView"
        component={WebView}
        options={({ route }: WebViewScreenProps) => ({
          headerTitle: () => (
            <Text
              numberOfLines={1}
              style={{
                alignSelf: 'center',
              }}>
              {route.params.title}
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={
          isLoggedIn
            ? {
                title: 'Favorites',
                headerRight: () => (
                  <Pressable
                    hitSlop={HIT_SLOP_10}
                    onPress={() => dispatch({ type: GOOGLE_SIGN_OUT })}>
                    <Text
                      style={{
                        fontSize: calcSize(13),
                        fontFamily: 'Rubik-Bold',
                        color: ORANGE,
                      }}>
                      התנתקות
                    </Text>
                  </Pressable>
                ),
              }
            : { title: 'Google SignIn' }
        }
      />
    </Stack.Navigator>
  );
};

export default Routes;
