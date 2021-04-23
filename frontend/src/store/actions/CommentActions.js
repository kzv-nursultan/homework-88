import axiosUrl from "../../axiosUrl";

export const GET_POST_COMMENT_REQUEST = 'GET_POST_COMMENT_REQUEST';
export const GET_POST_COMMENT_SUCCESS = 'GET_POST_COMMENT_SUCCESS';
export const GET_POST_COMMENT_FAILURE = 'GET_POST_COMMENT_FAILURE';

export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';

export const getPostCommentRequest = () => ({type:GET_POST_COMMENT_REQUEST});
export const getPostCommentSuccess = value => ({type:GET_POST_COMMENT_SUCCESS, value});
export const getPostCommentFailure = error => ({type:GET_POST_COMMENT_FAILURE, error});

export const postCommentRequest = () => ({type: POST_COMMENT_REQUEST});
export const postCommentSuccess = value => ({type: POST_COMMENT_SUCCESS, value});
export const postCommentFailure = error => ({type: POST_COMMENT_FAILURE, error});

export const getPostComment = (postId) => {
    return async dispatch => {
        try {
            dispatch(getPostCommentRequest());
            const response = await axiosUrl.get('/comments/' + postId);
            dispatch(getPostCommentSuccess(response.data));
        } catch (error) {
            dispatch(getPostCommentFailure(error));
        }
    };
};

export const postComment = (data, token) => {
    return async dispatch => {
        try {
            dispatch(postCommentRequest());
            const response = await axiosUrl.post('/comments', data, {headers:{
                'Authorization': token
                }});
            dispatch(postCommentSuccess(response.data));
        } catch (error) {
            dispatch(postCommentFailure(error));
        }
    };
};