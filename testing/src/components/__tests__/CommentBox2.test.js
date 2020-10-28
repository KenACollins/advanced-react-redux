// Note: This file has the same unit tests as CommentBox.test.js except that it uses shallow mode.
import React from "react";
import { shallow } from "enzyme";
import CommentBox from "src/components/CommentBox";

let wrappedComponent;

beforeEach(() => {
    wrappedComponent = shallow(<CommentBox />); // Get back component with additional functionality.
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
        const mockChangeEvent = { target: { value: "new comment" } };
        wrappedComponent.find("textarea").simulate("change", mockChangeEvent);
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
        const mockSubmitEvent = { preventDefault: () => { } };
        wrappedComponent.find("form").simulate("submit", mockSubmitEvent);
        wrappedComponent.update();
        expect(wrappedComponent.find("textarea").prop("value")).toEqual("");
    });
});
