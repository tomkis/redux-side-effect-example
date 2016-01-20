import * as Actions from '../actions';

const initialState = {
  numberInputs: null,
  initialized: false,
  focusedIndex: 0,
  focusStep: 1
};

// Just few DOM side effects
const focusElement = element => () => element.focus();
const preventDefault = ev => () => ev.preventDefault();

const TAB_KEY_CODE = 9;

const isTab = (keyCode, shift) => keyCode === TAB_KEY_CODE && !shift;
const isShiftTab = (keyCode, shift) => keyCode === TAB_KEY_CODE && shift;

// This is completely pure reducer with no side effects, all the side effects are yielded
const moveFocus = function*(state, domNodes, nextFocusNode, keyCode, shift, ev) {
  // we'll preventDefault all the Tab and Shift + Tabs, because we want to
  // control it programatically

  if (isTab(keyCode, shift)) {
    yield preventDefault(ev);

    // let's just calculate new focus index
    const newIndex = state.focusedIndex + state.focusStep;

    // if the new index is out of bounds let's just
    // focus next focus element (blur the component)
    if (newIndex > state.numberInputs - 1) {
      yield focusElement(nextFocusNode);

      return {...state, focusedIndex: state.numberInputs - 1};
    } else {
      // Do the focus programatically
      yield focusElement(domNodes[newIndex]);

      return {...state, focusedIndex: newIndex};
    }
  } else if (isShiftTab(keyCode, shift)) {
    yield preventDefault(ev);

    // let's just calculate new focus index
    const newIndex = state.focusedIndex - state.focusStep;

    if (newIndex < 0) {
      return {...state, focusedIndex: 0};
    } else {
      // Do the focus programatically
      yield focusElement(domNodes[newIndex]);
      return {...state, focusedIndex: newIndex};
    }
  } else {
    return state;
  }
};

export default function*(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
  case Actions.APPLICATION_WILL_MOUNT:
    return {...state, numberInputs: payload};

  case Actions.DOM_INITIALIZED:
    return {...state, initialized: true};

  case Actions.FOCUS:
    // when the component is focused, let's just focus the specific input
    yield focusElement(action.domNodes[state.focusedIndex]);
    return state;

  case Actions.KEY_DOWN:
    return yield* moveFocus(
      state,
      action.domNodes,
      action.nextFocusNode,
      payload.keyCode,
      payload.shift,
      payload.ev
    );

  case Actions.FOCUS_STEP_CHANGED:
    // just setting the focus step and keeping it "somehow" in bounds
    return {...state,
        focusStep: payload ?
          Math.min(Math.max(parseInt(payload, 10), 1), state.numberInputs - 1) : ''};

  default:
    return state;
  }
}
