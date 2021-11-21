import React from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {StyleSheet, Text, View} from 'react-native';
import {calcSize} from '../../Utils';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Store/Reducers';
import {GOOGLE_SIGN_IN} from '../../Store/Actions/actionTypes';

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const {loginInProgress} = useSelector(
    (state: RootState) => state.UserReducer,
  );

  const signIn = () => dispatch({type: GOOGLE_SIGN_IN});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>התחבר על מנת לצפות ברשימת המועדפים שלך</Text>
      <View style={styles.googleBtnContainer}>
        <GoogleSigninButton
          style={styles.googleBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={loginInProgress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Rubik-Medium',
    fontSize: calcSize(20),
    textAlign: 'center',
    marginTop: calcSize(100),
  },
  googleBtnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: calcSize(100),
  },
  googleBtn: {
    width: '80%',
    height: calcSize(60),
    marginTop: calcSize(50),
  },
});

export default GoogleLogin;
