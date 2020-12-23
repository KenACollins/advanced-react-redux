/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import Header from './Header';

export default ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
