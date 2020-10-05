import React from "react";
import { shallow } from "enzyme";
import App from "src/components/App";
import CommentBox from "src/components/CommentBox";
import CommentList from "src/components/CommentList";

let wrappedComponent;

beforeEach(() => {
    wrappedComponent = shallow(<App />); // Get back component with additional functionality.
});

it("shows a comment box", () => {
    expect(wrappedComponent.find(CommentBox).length).toEqual(1);
});

it("shows a comment list", () => {
    expect(wrappedComponent.find(CommentList).length).toEqual(1);
});

