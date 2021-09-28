import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }
    render() {
        if (this.state.errorInfo) {
            return <p>Oops, something went wrong!</p>
        }
        return this.props.children
    }
}
