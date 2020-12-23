import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    componentDidMount() {
        this.props.signout();   // signout() is action creator function passed to us via Redux. 
    }

    render() {
        return <div>Sorry to see you go</div>;
    }
}

export default connect(null, actions)(Signout);