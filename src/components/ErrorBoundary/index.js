import React from "react";
import PropTypes from "prop-types";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return (
        <>
          <p>Oops, something went wrong! See console.log</p>
          <pre>
            <code>{error}</code>
          </pre>
        </>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
