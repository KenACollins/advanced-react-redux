// Note: Lowercase name requireAuth.js since this is exporting a function, not a class.
// This is the boiler plate code you start with every time you create a higher order component, then add to it.
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {
        // Our component just got rendered for the first time.
        componentDidMount() {
            this.shouldNavigateAway();
        }

        // Our component just got updated with a new set of props.
        componentDidUpdate(prevProps, prevState, snapshot) {
            this.shouldNavigateAway();
        }

        // Helper function needed by both lifecycle methods above.
        shouldNavigateAway() {
            if (!this.props.auth) {             // If user is not logged in...
                this.props.history.push('/');   // Force user to home page.
            }
        }

        // Pass all props received from parent/grandparent above down to child component.
        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { auth: state.auth };
    }

    return connect(mapStateToProps)(ComposedComponent);
};
