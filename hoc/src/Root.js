import React from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import reducers from './reducers';
// import reduxPromise from 'redux-promise';
import async from "./middleware/async";
import stateValidator from "./middleware/stateValidator";

// Note: Ability to pass in initial state to the store is not required by our application, it is required by our
// src/components/__tests__/CommentList.test.js unit test file which needs to set state with initial comments.
export default ({ children, initialState = {} }) => {
    const store = createStore(reducers, initialState, applyMiddleware(async, stateValidator));
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

