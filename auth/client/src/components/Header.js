import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) { // If user is authenticated...
            return (
                <div>
                    <Link to="/feature">Feature</Link>
                    <Link to="/signout">Sign Out</Link>
                </div>
            );
        }
        else {  // Otherwise, user is NOT authenticated.
            return (
                <div>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/signin">Sign In</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="header">
                <Link to="/">Home</Link>
                {this.renderLinks()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(Header);
