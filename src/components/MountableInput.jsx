import React, { Component, PropTypes } from 'react';

export default class MountableInput extends Component {

  static propTypes = {
    onDidMount: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  }

  componentDidMount() {
    // Async event simulating (redux-saga limitation)
    setTimeout(() => {
      this.props.onDidMount(
        this.props.index,
        this.refs.input
      );
    });
  }

  render() {
    // It's mandatory to prevent default event on focus
    // because we don't want to focus the field when it's clicked.
    // It's completely in the control of the app.

    return (
      <input
        ref="input"
        onFocus={ev => ev.preventDefault()}
        onKeyDown={this.props.onKeyDown} />
    );
  }
}
