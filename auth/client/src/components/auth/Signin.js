import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';

class Signin extends Component {
    onSubmit = formProps => {           // formProps example: {email: "test@fake.com", password: "fake"}
        this.props.signin(formProps, () => {
            this.props.history.push('/feature');
        });   // signin() is action creator function passed to us via Redux. history is object passed via React Router. We create callback in 2nd arg.
    };

    render() {
        const { handleSubmit } = this.props;    // Destructure prop provided by Redux Form.

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset>
                <div>{this.props.errorMessage}</div>
                <button>Sign In!</button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return { errorMessage: state.auth.errorMessage };
};

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signin' })
)(Signin);

