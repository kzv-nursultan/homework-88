import axiosUrl from "../../axiosUrl";

export const GET_ALL_POSTS_REQUEST = 'GET_ALL_POSTS_REQUEST';
export const GET_ALL_POSTS_SUCCESS = 'GET_ALL_POSTS_SUCCESS';
export const GET_ALL_POSTS_FAILURE = 'GET_ALL_POSTS_FAILURE';

export const POST_POST_REQUEST = 'POST_POST_REQUEST';
export const POST_POST_SUCCESS = 'POST_POST_SUCCESS';
export const POST_POST_FAILURE = 'POST_POST_FAILURE';

export const GET_ONE_POST_REQUEST = 'GET_ONE_POST_REQUEST';
export const GET_ONE_POST_SUCCESS = 'GET_ONE_POST_SUCCESS';
export const GET_ONE_POST_FAILURE = 'GET_ONE_POST_FAILURE';

export const getAllPostsRequest = () => ({type: GET_ALL_POSTS_REQUEST});
export const getAllPostsSuccess = value => ({type: GET_ALL_POSTS_SUCCESS, value});
export const getAllPostsFailure = error => ({type: GET_ALL_POSTS_FAILURE, error});

export const postPostRequest = () => ({type: POST_POST_REQUEST});
export const postPostSuccess = value => ({type: POST_POST_SUCCESS, value});
export const postPostFailure = error => ({type: POST_POST_FAILURE, error});

export const getOnePostRequest = () => ({type:GET_ONE_POST_REQUEST});
export const getOnePostSuccess = value => ({type:GET_ONE_POST_SUCCESS, value});
export const getOnePostFailure = error => ({type:GET_ONE_POST_FAILURE, error});

export const getAllPosts = () => {
    return async dispatch => {
        try {
            dispatch(postPostRequest());
            const response = await axiosUrl.get('/posts');
            dispatch(getAllPostsSuccess(response.data));
        } catch (error) {
            dispatch(getAllPostsFailure(error));
        };
    };
};

export const postPost = (data, token) => {
    return async dispatch => {
        try {
            dispatch(postPostSuccess());
            const response = await axiosUrl.post('/posts', data, {headers:{
                'Authorization':token
                }});
            dispatch(postPostSuccess(response.data));
        } catch (e) {
            dispatch(postPostFailure(e));
        };
    };
};

export const getOnePost = (id) => {
    return async dispatch => {
        try {
            dispatch(getOnePostRequest());
            const response = await axiosUrl.get('/posts/'+id);
            dispatch(getOnePostSuccess(response.data));
        } catch (error) {
            dispatch(getOnePostFailure(error));
        };
    };
};