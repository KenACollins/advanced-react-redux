// Note: The unit tests in this file could be implemented with shallow rendering. Full DOM rendering is done just to teach the concept.
import React from "react";
import { mount } from "enzyme";
import CommentBox from "src/components/CommentBox";

let wrappedComponent;

beforeEach(() => {
    wrappedComponent = mount(<CommentBox />); // Get back component with additional functionality.
});

afterEach(() => {
    wrappedComponent.unmount();
});

it("has a text area and a button", () => {
    expect(wrappedComponent.find("textarea").length).toEqual(1);
    expect(wrappedComponent.find("button").length).toEqual(1);
});

describe('the text area', () => {
    /**
     * Trigger change event on textarea, causing CommentBox's handleChange() callback to be invoked with fake event object
     * containing target.value properties. Because setting state in handleChange() is asynchronous, we force
     * component to update itself after state settles so we can check value in text area.
     */
    beforeEach(() => {
        wrappedComponent.find("textarea").simulate("change", { target: { value: "new comment" } });
        wrappedComponent.update();
    });

    it("allows users to type into it", () => {
        expect(wrappedComponent.find("textarea").prop("value")).toEqual("new comment");
    });

    /**
     * Trigger submit event on form, causing CommentBox's handleSubmit() callback to be invoked. Because setting state in handleSubmit()
     * is asynchronous, we force component to update itself after state settles so we can check value in text area.
     */
    it("should be emptied after user submits form", () => {
        wrappedComponent.find("form").simulate("submit");
        wrappedComponent.update();
        expect(wrappedComponent.find("textarea").prop("value")).toEqual("");
    });
});
