import React, { Component } from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { createEffectCapableStore } from 'redux-side-effects';
import sagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';

import rootSaga from '../sagas/rootSaga';
import rootReducer from '../reducers/rootReducer';
import Application from './Application';

export default class Root extends Component {

  constructor() {
    super();

    // Combination of redux-saga and redux-side-effects
    const storeFactory = compose(
      applyMiddleware(
        sagaMiddleware(rootSaga)
      ),
      createEffectCapableStore,
      devTools()
    )(createStore);

    this.state = {
      store: storeFactory(rootReducer)
    };

    module.hot.accept('../reducers/rootReducer', () => {
      this.state.store.replaceReducer(require('../reducers/rootReducer'));
    });
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <Application initialNumberInputs={6} />
      </Provider>
    );
  }
}
