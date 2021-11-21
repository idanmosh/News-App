import React, { FC } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { load } from '../../Constants/styles';
import { WebView as WV, WebViewProps as WVProps } from 'react-native-webview';
import { RootStackParam } from '../../Routes';
import { RouteProp } from '@react-navigation/native';
import { ORANGE } from '../../Constants';

interface WebViewProps extends WVProps {
  route: RouteProp<RootStackParam, 'WebView'>;
}

const WebView: FC<WebViewProps> = ({ route, ...props }) => {
  const { url = '' } = route.params;
  return (
    <WV
      source={{ uri: url }}
      startInLoadingState={true}
      onError={() => Alert.alert('Failed to load article.')}
      renderLoading={() => (
        <ActivityIndicator
          size="large"
          color={ORANGE}
          style={[StyleSheet.absoluteFill, load.loader]}
        />
      )}
      {...props}
    />
  );
};

export default WebView;
