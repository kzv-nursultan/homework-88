import {
    GET_ALL_POSTS_FAILURE,
    GET_ALL_POSTS_REQUEST,
    GET_ALL_POSTS_SUCCESS, GET_ONE_POST_FAILURE, GET_ONE_POST_REQUEST, GET_ONE_POST_SUCCESS, POST_POST_FAILURE,
    POST_POST_REQUEST,
    POST_POST_SUCCESS
} from "../actions/PostsActions";

const initialState = {
    loading: false,
    getPosts: [],
    getError: null,
    postPost: {},
    postError: null,
    onePost:{},
    onePostError:null,
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS_REQUEST:
            return {...state, loading: true};
        case GET_ALL_POSTS_SUCCESS:
            return {...state, getPosts: action.value, loading: false};
        case GET_ALL_POSTS_FAILURE:
            return {...state, getError: action.error, loading: false};
        case POST_POST_REQUEST:
            return {...state, loading: true};
        case POST_POST_SUCCESS:
            return {...state, postPost: action.value, loading: false};
        case POST_POST_FAILURE:
            return {...state, postError: action.error, loading: false};
        case GET_ONE_POST_REQUEST:
            return {...state, loading: true};
        case GET_ONE_POST_SUCCESS:
            return {...state, onePost: action.value, loading: false};
        case GET_ONE_POST_FAILURE:
            return {...state, onePostError: action.error, loading: false};
        default:
            return state;
    };
};