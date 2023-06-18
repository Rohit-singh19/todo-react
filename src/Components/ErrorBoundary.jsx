/*
This file handle the page crash.
If there is any crash inside the children then it will show the fallbackUI 
*/

import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return React.cloneElement(this.props.fallback, {
        error: this.state.error,
      });
    }
    return this.props.children;
  }
}
