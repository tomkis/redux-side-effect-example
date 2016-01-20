import { race, take, put } from 'redux-saga';

import * as Actions from '../actions';
import * as ActionCreators from '../actionCreators';

export default function*() {
  const applicationWillMountAction = yield take(Actions.APPLICATION_WILL_MOUNT);
  const numberInputs = applicationWillMountAction.payload;

  const applicationDidMountAction = yield take(Actions.APPLICATION_DID_MOUNT);
  const nextFocusNode = applicationDidMountAction.payload;

  const domNodes = {};
  for (let i = 0; i < numberInputs; i++) {
    const { payload } = yield take(Actions.INPUT_MOUNTED);
    domNodes[payload.mountIndex] = payload.node;
  }

  // We inform the app that we are basically ready for user interaction
  yield put(ActionCreators.domInitialized());

  while (true) {
    const {focus, keyDown} = yield race({
      focus: take(Actions.FOCUS_REQUEST),
      keyDown: take(Actions.KEY_DOWN_REQUEST)
    });

    // we'll re-dispatch those events for reducers
    // and intermediate non-serializable state is provided
    if (focus) {
      yield put({...ActionCreators.focus(), domNodes});
    } else {
      yield put({...ActionCreators.keyDown(keyDown.payload), domNodes, nextFocusNode});
    }
  }
}
