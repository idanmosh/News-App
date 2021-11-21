import { applyMiddleware, compose, createStore, Store } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import Reducers from './Reducers';
import Reactotron from '../../ReactotronConfig';

let store: Store;
export let sagaMiddleware: SagaMiddleware;

if (__DEV__) {
  const sagaMonitor = Reactotron.createSagaMonitor?.();
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  store = createStore(
    Reducers,
    compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer()),
  );
} else {
  sagaMiddleware = createSagaMiddleware();
  store = createStore(Reducers, applyMiddleware(sagaMiddleware));
}

export const persistor = persistStore(store);

export default store;
