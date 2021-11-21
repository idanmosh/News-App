import React from 'react';
import { Text, View } from 'react-native';
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_SHADOW_COLOR,
  TOP_INSET,
} from '../Constants';
import {
  HeaderStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { calcSize } from '../Utils';
import { useNavigation } from '@react-navigation/core';
import CloseButton from '../Components/Common/CloseButton';

export const headerTitleStyle: StackNavigationOptions['headerTitleStyle'] = {
  fontWeight: 'normal',
  textAlign: 'center',
};

export const headerBase: StackNavigationOptions = {
  headerStyle: {
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 14,
  },
  headerLeftContainerStyle: {
    marginStart: calcSize(24),
    flexGrow: 0,
    flexBasis: 'auto',
  },
  headerRightContainerStyle: {
    marginEnd: calcSize(24),
    flexGrow: 0,
    flexBasis: 'auto',
  },
  headerTitleContainerStyle: {
    marginHorizontal: 0,
    maxWidth: 'auto',
    flexGrow: 1,
    flex: 1,
  },
  headerTitleStyle,
  title: '',
  headerRight: () => <View style={{ width: DEFAULT_ICON_SIZE }}></View>,
  headerLeft: () => {
    const navigation = useNavigation();
    return <CloseButton type="back" onPress={navigation.goBack} />;
  },
  headerTitle: (props) => <Text numberOfLines={1} {...props} />,
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
};
