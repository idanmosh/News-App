import React, { FC } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import NewItem from '../Common/NewItem';
import { categoryNews, load, newsStyles } from '../../Constants/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Reducers';
import { extractIndexToString } from '../../Utils';
import GoogleLogin from './GoogleLogin';
import { ORANGE } from '../../Constants';
import { FavoritesScreenProps } from '../../Routes';

const Favorites: FC<FavoritesScreenProps> = ({ navigation }) => {
  const {
    NewsReducer: { favorites },
    UserReducer: { isLoggedIn, loginInProgress },
  } = useSelector((state: RootState) => state);

  return (
    <>
      <ActivityIndicator
        style={[StyleSheet.absoluteFill, load.loader]}
        color={ORANGE}
        size="large"
        animating={loginInProgress}
      />
      {isLoggedIn ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={favorites}
          ListFooterComponent={<View style={categoryNews.footer} />}
          contentContainerStyle={[newsStyles.container, categoryNews.container]}
          keyExtractor={extractIndexToString}
          renderItem={({ item }) => (
            <NewItem
              containerStyle={categoryNews.itemStyle}
              {...item}
              onPress={() =>
                navigation.navigate('WebView', {
                  title: item.title,
                  url: item.url,
                })
              }
            />
          )}
        />
      ) : (
        <GoogleLogin />
      )}
    </>
  );
};

export default Favorites;
