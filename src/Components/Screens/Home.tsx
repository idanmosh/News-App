import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { calcSize, extractIndexToString } from '../../Utils';
import { RootState } from '../../Store/Reducers';
import News, { PressProps } from '../../Components/Common/News';
import { HomeScreenProps } from '../../Routes';
import { categoryNews } from '../../Constants/styles';
import { FETCH_CATEGORIES } from '../../Store/Actions/actionTypes';

const Home: FC<HomeScreenProps> = ({ navigation }) => {
  const newsReducer = useSelector((state: RootState) => state.NewsReducer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const fetchCategories = useCallback(() => {
    dispatch({ type: FETCH_CATEGORIES });
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const {
    business,
    entertainment,
    general,
    health,
    science,
    sports,
    technology,
    favorites,
  } = newsReducer;

  const data = useMemo(() => {
    return [
      general.slice(0, 6),
      health.slice(0, 6),
      sports.slice(0, 6),
      business.slice(0, 6),
      entertainment.slice(0, 6),
      science.slice(0, 6),
      technology.slice(0, 6),
    ];
  }, [newsReducer, favorites]);

  const onPress = ({ screen, category = 'general', newItem }: PressProps) => {
    switch (screen) {
      case 'Category':
        navigation.navigate('CategoryNews', {
          title: `${category.charAt(0).toUpperCase()}${category.slice(
            1,
            category.length,
          )} News`,
          data: newsReducer[category],
        });
        break;
      default:
        navigation.navigate('WebView', {
          url: newItem?.url || '',
          title: newItem?.title || '',
        });
        break;
    }
  };

  return (
    <>
      {isFocused && (
        <FlatList
          data={data}
          keyExtractor={extractIndexToString}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<View style={categoryNews.footer} />}
          contentContainerStyle={{
            marginTop: calcSize(30),
          }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) =>
            item.length ? <News data={item} onPress={onPress} /> : null
          }
        />
      )}
    </>
  );
};

export default Home;
