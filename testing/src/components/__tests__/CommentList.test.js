import React from "react";
import { mount } from 'enzyme';
import Root from 'src/Root';
import CommentList from "../CommentList";
import cheerio from 'cheerio';  // Cheerio is included in Enzyme so don't need to install it with 'npm install cheerio'.

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

it('shows the text for each comment using Cheerio explicitly', () => {  // See import statement up top.
    const $ = cheerio.load(wrappedComponent.render().html());   // Load Cheerio and assign to dollar sign like jQuery.
    expect($('li').first().text()).toContain('Comment 1');      // 'li:first' CSS selector does not work, which is odd.
    expect($('li:nth-child(2)').text()).toContain('Comment 2');
});
