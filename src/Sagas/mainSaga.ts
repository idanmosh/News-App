import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { CATEGORIES } from '../Constants';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { urlBuilder } from '../Utils';
import axios from 'axios';
import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import {
  FETCH_CATEGORIES,
  GOOGLE_SIGN_IN,
  GOOGLE_SIGN_OUT,
  SET_CATEGORIES,
  SET_LOGIN_PROGRESS,
} from '../Store/Actions/actionTypes';
import { hideModal, showModal } from '../Store/Actions/actionCreators';
import store from '../Store';
import { batch } from 'react-redux';

function* fetchCategoriesSaga(language = 'en', sort = 'popularity') {
  try {
    let requests: Array<Promise<void>> = [];

    CATEGORIES.map((category) => {
      requests.push(
        axios.get(
          urlBuilder(
            `&categories=${category}&language=${language}&sort=${sort}`,
          ),
        ),
      );
    });

    let response: Array<any> = yield Promise.all(requests);

    response.forEach((categories, index) => {
      response[index] = categories?.data?.data;
    });

    const [
      entertainment,
      health,
      general,
      business,
      sports,
      science,
      technology,
    ] = response;

    yield put({
      type: SET_CATEGORIES,
      payload: {
        business,
        entertainment,
        general,
        health,
        science,
        sports,
        technology,
      },
    });
  } catch (error) {
    yield put(
      showModal({
        title: 'שגיאה',
        message: 'ארעה שגיאה בעת ניסיון קבלת הכתבות מהשרת',
        confirmText: 'נסה שוב',
        onConfirm: () => {
          batch(() => {
            store.dispatch(hideModal());
            store.dispatch({ type: FETCH_CATEGORIES });
          });
        },
      }),
    );
  }
}

function* googleSignInSaga() {
  try {
    yield put({
      type: SET_LOGIN_PROGRESS,
      payload: true,
    });

    yield call(GoogleSignin.hasPlayServices, {
      showPlayServicesUpdateDialog: true,
    });

    // Get the users ID token
    const { idToken }: User = yield call(GoogleSignin.signIn);

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    yield auth().signInWithCredential(googleCredential);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      yield put(
        showModal({
          title: 'שגיאה',
          message: 'ארעה שגיאה בעת ניסיון ההתחברות',
          confirmText: 'אוקיי',
          onConfirm: () => store.dispatch(hideModal()),
        }),
      );
    } else if (error.code === statusCodes.IN_PROGRESS) {
      yield put(
        showModal({
          title: 'שגיאה',
          message: 'תהליך ההרשמה עדיין רץ ברקע',
          confirmText: 'אוקיי',
          onConfirm: () => store.dispatch(hideModal()),
        }),
      );
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      yield put(
        showModal({
          title: 'שגיאה',
          message: 'לא קיים שירות גוגל play services',
          confirmText: 'אוקיי',
          onConfirm: () => store.dispatch(hideModal()),
        }),
      );
    } else {
      yield put(
        showModal({
          title: 'שגיאה',
          message: 'שגיאה כללית',
          confirmText: 'אוקיי',
          onConfirm: () => store.dispatch(hideModal()),
        }),
      );
    }
  } finally {
    yield put({
      type: SET_LOGIN_PROGRESS,
      payload: false,
    });
  }
}

function* GoogleSignOutSaga() {
  try {
    yield put({
      type: SET_LOGIN_PROGRESS,
      payload: true,
    });

    yield auth().signOut();
    yield call(GoogleSignin.revokeAccess);
  } catch (error) {
    yield put(
      showModal({
        title: 'שגיאה',
        message: 'שגיאה בעת הנסיון להתנתק',
        confirmText: 'אוקיי',
        onConfirm: () => store.dispatch(hideModal()),
      }),
    );
  } finally {
    yield put({
      type: SET_LOGIN_PROGRESS,
      payload: false,
    });
  }
}

// function* initializeApp() {
//   yield call(firebase.initializeApp, {
//     appId: '1:489517594417:android:43bb961184efdb9e5aa21',
//     projectId: 'newsappisr',
//   });
// }

function* mainSaga() {
  try {
    yield all([
      // initializeApp(),
      takeLatest(GOOGLE_SIGN_IN, googleSignInSaga),
      takeLatest(GOOGLE_SIGN_OUT, GoogleSignOutSaga),
      takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga),
    ]);
  } catch (error) {
    console.tron.log(error);
  }
}

export default mainSaga;
