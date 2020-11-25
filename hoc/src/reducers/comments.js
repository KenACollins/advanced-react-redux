import { SAVE_COMMENT, FETCH_COMMENTS } from "../actions/types";

export default function (state = [], action) {
    switch (action.type) {
        case SAVE_COMMENT:
            return [...state, action.payload];  // To trigger stateValidator middleware, append ", {}" to the array.
        case FETCH_COMMENTS:
            // debugger; // Insert debugger here temporarily to see what is inside our action.
            // The external API returns JSON array elements with 5 properties. We will just use 'name' as a comment.
            const comments = action.payload.data.map(comment => comment.name);
            return [...state, ...comments];
        default:
            return state;
    }
}
