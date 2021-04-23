import {
    GET_POST_COMMENT_FAILURE,
    GET_POST_COMMENT_REQUEST,
    GET_POST_COMMENT_SUCCESS, POST_COMMENT_FAILURE,
    POST_COMMENT_REQUEST, POST_COMMENT_SUCCESS
} from "../actions/CommentActions";

const initialState = {
    loading: false,
    comments: [],
    error:null,
    addComment: {},
    addError: null
}

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST_COMMENT_REQUEST:
            return {...state, loading:true};
        case GET_POST_COMMENT_SUCCESS:
            return {...state, comments: action.value, loading: false};
        case GET_POST_COMMENT_FAILURE:
            return {...state, error: action.error, loading:false};
        case POST_COMMENT_REQUEST:
            return {...state, loading: true};
        case POST_COMMENT_SUCCESS:
            return {...state, addComment: action.value, loading: false};
        case POST_COMMENT_FAILURE:
            return {...state, addError: action.error, loading: false};
        default:
            return state;
    }
};