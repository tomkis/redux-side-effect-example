import * as Actions from './actions';

const buildAction = (type, payload = {}) => ({type, payload});

export const applicationWillMount = numberInputs => buildAction(Actions.APPLICATION_WILL_MOUNT, numberInputs);

export const applicationDidMount = nextFocusElement => buildAction(Actions.APPLICATION_DID_MOUNT, nextFocusElement);

export const domInitialized = () => buildAction(Actions.DOM_INITIALIZED);

export const focusRequest = () => buildAction(Actions.FOCUS_REQUEST);

export const focus = () => buildAction(Actions.FOCUS);

export const inputMounted = (mountIndex, node) => buildAction(Actions.INPUT_MOUNTED, {mountIndex, node});

export const keyDownRequest = (shift, keyCode, ev) => buildAction(Actions.KEY_DOWN_REQUEST, {shift, keyCode, ev});

export const keyDown = payload => buildAction(Actions.KEY_DOWN, payload);

export const focusStepChanged = value => buildAction(Actions.FOCUS_STEP_CHANGED, value);
