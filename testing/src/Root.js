import React from "react";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducers from './reducers';

// Note: Ability to pass in initial state to the store is not required by our application, it is required by our
// src/components/__tests__/CommentList.test.js unit test file which needs to set state with initial comments.
export default ({ children, initialState = {} }) => {
    return (
        <Provider store={createStore(reducers, initialState)}>
            {children}
        </Provider>
    );
};

