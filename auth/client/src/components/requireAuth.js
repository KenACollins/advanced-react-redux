// Higher order component copied from hoc project with change to mapStateToProps state property to match this project. 
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {
        // Our component just got rendered for the first time.
        componentDidMount() {
            this.shouldNavigateAway();
        }

        // Our component just got updated with a new set of props.
        componentDidUpdate() {
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
        return { auth: state.auth.authenticated };  // Let props.auth = authenticated string token property, which is "" if not logged in.
    }

    return connect(mapStateToProps)(ComposedComponent);
};
