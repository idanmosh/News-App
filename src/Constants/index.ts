import {Dimensions, Platform} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const DEFAULT_WIDTH = 375;
export const TOP_INSET = initialWindowMetrics?.insets.top ?? 0;
export const BOTTOM_INSET = initialWindowMetrics?.insets.bottom ?? 0;
export const DEFAULT_ICON_SIZE = 22;
export const HIT_SLOP_10 = {top: 10, left: 10, right: 10, bottom: 10};

// COLORS
export const WHITE = 'white';
export const GRAY = 'gray';
export const ORANGE = '#fd6d0a';

export const DEFAULT_SHADOW_COLOR = Platform.select({
  android: 'rgba(0,0,0,0.4)',
  ios: 'rgb(0,0,0)',
});

export const CATEGORIES = [
  'entertainment',
  'health',
  'general',
  'business',
  'sports',
  'science',
  'technology',
];
