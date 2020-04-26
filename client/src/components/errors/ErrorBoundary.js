import React, {Component} from 'react';

export default class ErrorBoundary extends Component {

    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }

    render() {

        if (this.state.hasError) {
            return (
                <div className="error-indicator">
                    <span className="boom">BOOM!</span>
                    <span>something has gone terribly wrong</span>
                    <span>(but we already sent droids to fix it)</span>
                </div>
            )
        }

        return this.props.children;
    }
}
