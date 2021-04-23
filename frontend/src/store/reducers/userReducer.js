import {
    LOG_OUT_USER,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    POST_USER_FAILURE,
    POST_USER_REQUEST,
    POST_USER_SUCCESS
} from "../actions/UsersActions";

const initialState = {
    loading: false,
    data: {},
    error: null,
    loginLoading:false,
    loginUser: {},
    loginError:null
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_USER_REQUEST:
            return {...state, loading: true};
        case POST_USER_SUCCESS:
            return {...state, data:action.value, loading: false};
        case POST_USER_FAILURE:
            return {...state, error: action.error, loading: false};
        case LOGIN_USER_REQUEST:
            return {...state, loginLoading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, loginUser: action.value, loginLoading: false};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error, loginLoading: false};
        case LOG_OUT_USER:
            return {...initialState};
        default:
            return state;
    };
};