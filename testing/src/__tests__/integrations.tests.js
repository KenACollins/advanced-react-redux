// Integration test to test entire app.
import React from "react";
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'src/Root';
import App from "../components/App";

/**
 * Set up moxios and tell it to intercept and stop all axios requests. We provide it the URL to be on the lookout for,
 * but moxios does not actually call it. Instead, we provide a mocked response comprising just two comments.
 */
beforeEach(() => {
    moxios.install();
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [{ name: 'Fetched #1'}, {name: "Fetched #2"}]
    });
});

/* We uninstall moxios to ensure we don't attempt to use the same stub request above in other tests. */
afterEach(() => {
    moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
    // Attempt to render the entire app.
    const wrappedComponent = mount(
        <Root>
            <App />
        </Root>
    );

    // Find the 'Fetch Comments' button and click it.
    wrappedComponent.find('#fetch-comments').simulate('click');

    // Wrap our expect() to 'expect to find a list of comments' in a moxios.wait() function call to insert a tiny pause,
    // giving moxios a chance to intercept the axios network request. We also need to tell Jest to pause and wait for
    // our delayed code below to complete before declaring the unit test successful or not. We do this by adding a
    // 'done' second parameter to the it() invocation above which tells Jest the name of a callback function to invoke.
    // When we invoke done() below, we are telling Jest it can now declare the unit testing done. We don't actually
    // define a done() callback function.
    moxios.wait(() => {
        wrappedComponent.update();
        expect(wrappedComponent.find('li').length).toEqual(2);
        done();
        wrappedComponent.unmount();
    });
});
