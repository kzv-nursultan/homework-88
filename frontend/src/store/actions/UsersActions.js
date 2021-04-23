import axiosUrl from "../../axiosUrl";

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOG_OUT_USER = 'LOG_OUT_USER';

export const postUserRequest = () => ({type:POST_USER_REQUEST});
export const postUserSuccess = value => ({type:POST_USER_SUCCESS, value});
export const postUserFailure = error => ({type:POST_USER_FAILURE, error});

export const loginUserRequest = () => ({type:LOGIN_USER_REQUEST});
export const loginUserSuccess = value => ({type:LOGIN_USER_SUCCESS, value});
export const loginUserFailure = error => ({type:LOGIN_USER_FAILURE, error});

export const logOutUser = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.loginUser.user.token;
            await axiosUrl.delete('/users/session', {headers:{'Authorization':token}});
            dispatch({type:LOG_OUT_USER});
        } catch (e) {
            console.error(e);
        }
    };
};

export const postUser = (path, data) => {
    return async dispatch => {
        try {
            dispatch(postUserRequest());
            const response = await axiosUrl.post(path, data);
            dispatch(postUserSuccess(response.data));
        } catch (error) {
            if (error.response && error.response.data){
                dispatch(postUserFailure(error.response.data));
            } else {
                dispatch(postUserFailure({global:'No internet connection'}));
            }
        }
    };
};

export const loginUser = (path, data) => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosUrl.post(path, data);
            dispatch(loginUserSuccess(response.data));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(loginUserFailure(error.response.data));
            } else {
                dispatch(loginUserFailure({global:'No internet'}));
            }
        }
    };
};
