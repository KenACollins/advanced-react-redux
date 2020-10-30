import React from "react";
import { mount } from 'enzyme';
import Root from 'src/Root';
import CommentList from "../CommentList";
import CommentBox from "../CommentBox";

let wrappedComponent;

beforeEach(() => {
    const initialState = { comments: ['Comment 1', 'Comment 2']};
    wrappedComponent = mount(
        <Root initialState={initialState}>
            <CommentList />
        </Root>
    );
});

afterEach(() => {
    wrappedComponent.unmount();
});

it('creates one <li> tag per comment', () => {
    expect(wrappedComponent.find('li').length).toEqual(2);
});


it('shows the text for each comment', () => {
    expect(wrappedComponent.render().text()).toContain('Comment 1');
    expect(wrappedComponent.render().text()).toContain('Comment 2');
});
