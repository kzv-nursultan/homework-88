import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {makeStyles, Typography} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";

import FormInput from "../../components/FormInput/FormInput";
import {postComment} from "../../store/actions/CommentActions";

const useStyles = makeStyles({
    divBody: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: '10px 10px 8px #888888',
        padding: 30,
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)'
    },
    commentBtn: {
        margin: '10px auto',
    }
});


const NewComment = ({open, onClose, postId, user}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let author = user ? user._id : '';
    const [newComment, setNewComment] = useState({
        post: postId,
        author: author,
        text: '',
    });

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setNewComment(prevState => ({
            ...prevState,
            [name]:value,
        }));
    };

    const addBtnHandler = (event) => {
        event.preventDefault();
        dispatch(postComment({...newComment}, user.token));
    };

    const body = (
        <div className={classes.divBody}>
            <Typography variant='h3'>
                Add Comment
            </Typography>
          <form>
              <FormInput label={'Text'} onChange={onChangeHandler} value={newComment.text} name={'text'}/>
              <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.commentBtn}
                  onClick={addBtnHandler}>
                  Add Comment
              </Button>
          </form>
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default NewComment;
