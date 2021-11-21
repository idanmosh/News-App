import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { WHITE } from './src/Constants';
import { Provider } from 'react-redux';
import store, { sagaMiddleware } from './src/Store';
import Routes from './src/Routes';
import mainSaga from './src/Sagas/mainSaga';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GeneralModal from './src/Components/Common/GeneralModal';
import { config } from './src/Config';

LogBox.ignoreLogs(['Setting a timer']);

sagaMiddleware.run(mainSaga);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: WHITE,
    card: WHITE,
  },
};

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.WEB_CLIENT_ID,
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <GeneralModal />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
