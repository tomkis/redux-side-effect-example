import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { range } from 'lodash';

import * as ActionCreators from '../actionCreators';
import MountableInput from './MountableInput';

const mapStateToProps = appState => appState;

export default connect(mapStateToProps)(class Application extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    initialNumberInputs: PropTypes.number.isRequired,
    numberInputs: PropTypes.number,
    focusStep: PropTypes.number.isRequired,
    initialized: PropTypes.bool.isRequired
  };

  componentWillMount() {
    // Async event simulating (redux-saga limitation)
    setTimeout(() =>
      this.props.dispatch(ActionCreators.applicationWillMount(this.props.initialNumberInputs)));
  }

  componentDidMount() {
    // Async event simulating (redux-saga limitation)
    setTimeout(() =>
      this.props.dispatch(ActionCreators.applicationDidMount(this.refs.focusStep)));
  }

  getStyles() {
    // Just don't show the component unless everything is ready
    return {
      display: this.props.initialized ? 'block' : 'none'
    };
  }

  render() {
    const {
      numberInputs,
      focusStep,
      dispatch
    } = this.props;

    const BoundActionCreators = bindActionCreators(ActionCreators, dispatch);

    return (
      <div style={this.getStyles()}>
        <div
          tabIndex="0"
          style={{
            width: '200px',
            border: '1px solid black'
          }}
          onFocus={BoundActionCreators.focusRequest}
          >
          <ul>
            {range(numberInputs).map(index => (
              <li key={index}>
                {index} -
                <MountableInput
                  index={index}
                  onDidMount={BoundActionCreators.inputMounted}
                  onKeyDown={ev => {
                    ev.persist();

                    BoundActionCreators.keyDownRequest(ev.shiftKey, ev.keyCode, ev); // it's necessary to provide shiftKey and keyCode seperately
                                                                                     // because ev is non-serializable yet we need to keep that for replay.
                                                                                     // The ev is necessary for side effects
                  }}
                  />
              </li>
            ))}
          </ul>
        </div>

        <label>Focus Step:</label>
        <input
          type="text"
          ref="focusStep"
          value={focusStep}
          onChange={ev => BoundActionCreators.focusStepChanged(ev.target.value)} />
      </div>
    );
  }
});
