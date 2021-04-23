import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {getOnePost} from "../../store/actions/PostsActions";
import OnePostCard from "../../components/OnePostCard/OnePostCard";
import {getPostComment} from "../../store/actions/CommentActions";
import CommentCard from "../../components/CommentsCard/CommentCard";
import NewComment from "../NewComment/NewComment"
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
    test: {
        textAlign:'center'
    },
    posts: {
        margin:'20px auto'
    },
    comments: {
        margin: '10px auto',
        textAlign: 'center',
    },
    addBtnBlock: {
        margin: '20px auto',
        textAlign: 'center'
    },
    link:{
        marginTop:'35px',
        fontSize:'small',
        display:'block',
        marginLeft:'auto'
    }
})

const OnePostPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const [open, setOpen] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const post = useSelector(state=>state.posts.onePost);
    const comments = useSelector(state=>state.comments.comments);
    const loggedUser = useSelector(state=>state.user.loginUser);

    useEffect(()=>{
        dispatch(getOnePost(id));
    },[dispatch, id]);

    useEffect(()=>{
        dispatch(getPostComment(id));
    },[dispatch, id, trigger]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTrigger(!trigger);
    };

    let postCard = (
        <Typography variant='h4' className={classes.test}>
            Something went wrong
        </Typography>
    );

    let comment = (
        <Typography variant='h4' className={classes.test}>
            No Comments
        </Typography>
    );

    if(post._id){
        postCard = (
            <OnePostCard
            key={post._id}
            title={post.title}
            image={post.image}
            description={post.description}
            author={post.author.username}
            datetime={post.datetime}/>
        );
    };

    if(comments.length > 0) {
        comment = (
            comments.map(object=>(
                <CommentCard
                    key={object._id}
                    author={object.author.username}
                    text={object.text}
                    datetime={object.datetime}/>
            ))
        );
    };

    return (
        <Grid container direction='column' justify='center'>
            <Grid container item xs={11} justify='center' className={classes.posts}>
                {postCard}
            </Grid>
            <Grid container item xs={10} justify='center' direction='column' className={classes.comments}>
                <Typography variant='h3'>Comments:</Typography>
                {comment}
                <Grid container item justify='center' direction='column' xs={5} className={classes.addBtnBlock}>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleOpen}
                        disabled={!loggedUser.user ? true : false}>
                        {loggedUser.user ? 'Add Comment' : 'Sign in to add comment'}
                    </Button>
                    <NavLink to='/login' className={classes.link}>
                        Sign in?
                    </NavLink>
                </Grid>
            </Grid>
            <NewComment
            open={open}
            onClose={handleClose}
            postId={id}
            user={loggedUser.user}/>
        </Grid>
    );
};

export default OnePostPage;