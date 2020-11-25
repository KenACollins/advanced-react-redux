// This funky syntax of function returning function that returns a function is required structure for middleware.
// o 1st function accepts dispatch() function and optionally getState() function.
// o 2nd function accepts next() function representing next middleware to run.
// o 3rd function accepts action object.
export default ({ dispatch }) => next => action => {
    // debugger; // Insert debugger here temporarily to see what action is dispatched. We have two actions that will
    // pass through here: types 'change_auth' and 'fetch_comments'. The first one is not asynchronous and will pass
    // on through to the reducers via line 12 below. The second one is asynchronous and will have to resolve promise.

    // If action either does not have a payload or its payload is not a promise, send action on to next middleware.
    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    // If we fall through to here, that means action has a promise on its payload property.
    // We want to wait for promise to resolve (AKA get its data), and then create a new action
    // with that data and dispatch that action.
    action.payload.then(function(response) {
        // Grab all action properties (...action) in case more than type and payload exist.
        const newAction = { ...action, payload: response };
        dispatch(newAction);
    });
};

