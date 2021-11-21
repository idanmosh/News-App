import React, { FC } from 'react';
import { FlatList, View } from 'react-native';
import NewItem from '../Common/NewItem';
import { categoryNews, newsStyles } from '../../Constants/styles';
import { extractIndexToString } from '../../Utils';
import { CategoryNewsScreenProps } from '../../Routes';

const CategoryNews: FC<CategoryNewsScreenProps> = ({
  navigation,
  route,
  ...props
}) => {
  const { data = [] } = route.params;

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
      ListFooterComponent={<View style={categoryNews.footer} />}
      contentContainerStyle={[newsStyles.container, categoryNews.container]}
      keyExtractor={extractIndexToString}
      renderItem={({ item }) => (
        <NewItem
          containerStyle={categoryNews.itemStyle}
          {...item}
          onPress={() =>
            navigation.navigate('WebView', { url: item.url, title: item.title })
          }
        />
      )}
      {...props}
    />
  );
};

export default CategoryNews;
