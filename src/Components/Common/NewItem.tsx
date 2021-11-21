import {
  DEFAULT_SHADOW_COLOR,
  GRAY,
  ORANGE,
  SCREEN_WIDTH,
  WHITE,
} from '../../Constants';
import React, { FC, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { calcSize } from '../../Utils';
import { NewProps } from '../../Store/Reducers/NewsReducer';
import { NewsProps } from './News';
import Icon from './Icon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Reducers';
import {
  addFavorite,
  removeFavorite,
} from '../../Store/Actions/actionCreators';

interface NewItemProps extends NewProps {
  onPress: NewsProps['onPress'];
  containerStyle?: ViewStyle;
  showHeart?: boolean;
}

const NewItem: FC<NewItemProps> = (props, ...rest) => {
  const {
    image,
    url,
    author,
    title,
    description,
    onPress,
    containerStyle = {},
    showHeart = true,
  } = props;
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.NewsReducer);

  const [isFavoriteItem, setIsFavoriteItem] = useState(
    favorites.filter((item) => item.url === url).length > 0,
  );

  const fallbackImage = require('../../Assets/no_image.png');

  return (
    <TouchableOpacity
      onPress={() => onPress({ screen: 'WebView', newItem: props })}
      style={[styles.container, containerStyle]}
      {...rest}>
      <ImageBackground
        source={image ? { uri: image } : fallbackImage}
        defaultSource={fallbackImage}
        resizeMode={'stretch'}
        style={styles.image}
        imageStyle={styles.image}
      />
      {showHeart && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            isFavoriteItem
              ? dispatch(removeFavorite(props))
              : dispatch(addFavorite(props));
            setIsFavoriteItem(!isFavoriteItem);
          }}>
          <Icon
            size={22}
            source={
              isFavoriteItem
                ? require('../../Assets/heart_full.png')
                : require('../../Assets/heart_empty.png')
            }
          />
        </TouchableOpacity>
      )}
      <View style={styles.bottomSection}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.author} numberOfLines={1}>
            {author || 'unknown'}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={4}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 2.5,
    backgroundColor: WHITE,
    borderRadius: calcSize(12),
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 16,
  },
  icon: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  bottomSection: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: calcSize(2),
  },
  image: {
    height: calcSize(100),
    borderRadius: calcSize(5),
    marginBottom: calcSize(5),
    overflow: 'hidden',
  },
  author: {
    fontSize: calcSize(14),
    fontFamily: 'Rubik-Bold',
    paddingTop: calcSize(1),
    paddingBottom: calcSize(2),
    color: ORANGE,
  },
  title: {
    fontSize: calcSize(14),
    fontFamily: 'Rubik-Medium',
    paddingBottom: calcSize(3),
    color: GRAY,
  },
  description: {
    fontSize: calcSize(10),
    fontFamily: 'Rubik-Bold',
    paddingVertical: calcSize(3),
  },
});

export default NewItem;
