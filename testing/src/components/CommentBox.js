import React, { Component } from "react";

class CommentBox extends Component {
    state = { comment: "" };

    handleChange = event => {
        this.setState({ comment: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        // TODO: Call an action creator and save comment.
        this.setState({ comment: '' });     // Clear comment box after submission.
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h4>Add a Comment</h4>
                <textarea onChange={this.handleChange} value={this.state.comment} />
                <div>
                    <button>Submit Comment</button>
                </div>
            </form>
        );
    }
}

export default CommentBox;