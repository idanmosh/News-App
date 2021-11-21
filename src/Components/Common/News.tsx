import {newsStyles} from '../../Constants/styles';
import React, {FC} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {NewProps, NewsState} from '../../Store/Reducers/NewsReducer';
import {calcSize, extractIndexToString} from '../../Utils';
import NewItem from './NewItem';

export interface PressProps {
  screen: 'Category' | 'WebView';
  category?: keyof NewsState;
  newItem?: NewProps;
}

export interface NewsProps {
  data: Array<NewProps>;
  onPress: (props: PressProps) => void;
}

const News: FC<NewsProps> = ({data, onPress, ...props}) => (
  <>
    <View style={newsStyles.header}>
      <Text style={newsStyles.category}>{data[0]?.category}</Text>
      <TouchableOpacity
        onPress={() =>
          onPress({
            screen: 'Category',
            category: data[0]?.category as keyof NewsState,
          })
        }>
        <Text style={newsStyles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      inverted
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
      contentContainerStyle={newsStyles.container}
      ItemSeparatorComponent={() => <View style={{width: calcSize(18)}} />}
      keyExtractor={extractIndexToString}
      renderItem={({item}) => <NewItem {...item} onPress={onPress} />}
      {...props}
    />
  </>
);

export default News;
