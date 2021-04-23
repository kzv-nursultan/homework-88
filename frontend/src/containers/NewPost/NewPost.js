import React, {useRef, useState} from 'react';
import {Button, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import SendSharpIcon from '@material-ui/icons/SendSharp';
import FormInput from "../../components/FormInput/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {postPost} from "../../store/actions/PostsActions";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    itemBlock: {
        maxWidth: 600,
        margin: '10px auto'
    },
    formBlock: {
        width: '100%',
        textAlign:'center',
    },
    ordinaryInput: {
        display: 'none'
    },
    fileInput: {
        margin: '20px 0',
        cursor: 'pointer',
    }
})

const NewPost = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const inputClick = useRef();
    const history = useHistory();
    const [post, setPost] = useState({
        title:'',
        description:'',
        image:'',
        author:'',
    });
    const loggedUser = useSelector(state=>state.user.loginUser);

    if(!loggedUser.user) {
        history.push("/login")
    }

    const changeHandler = (e) => {
        const {name, value} = e.target;

        setPost(prevState => ({
            ...prevState,
                [name]:value,
                author:loggedUser.user._id
        }));
    };

    const currentClick = () => {
        inputClick.current.click();
    };

    const fileChangeHandler = (event) => {
        if (event.target.files[0].name){
            const name = event.target.name;
            const file = event.target.files[0];

            setPost(prevState => ({
                ...prevState,
                [name]:file
            }));
        } else {
            setPost(prevState => ({
                ...prevState,
                image:''
            }));
        }
    };

    const formSubmitHandler = async event => {
        event.preventDefault();

        try {
            const formData = new FormData();
            Object.keys(post).forEach(key=>(
                formData.append(key, post[key])
            ));
            await dispatch(postPost(formData, loggedUser.user.token));
            history.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid container>
            <Grid container item className={classes.itemBlock}>
                <form
                className={classes.formBlock}
                onSubmit={formSubmitHandler}>
                    <Typography variant='h5' component='h3'>
                        Add new Post
                    </Typography>
                    <FormInput label={'Title'} onChange={changeHandler} value={post.title} name={'title'}/>
                    <TextField
                        name='description'
                        label="Description"
                        multiline
                        rows={4}
                        defaultValue={post.description}
                        variant="outlined"
                        onChange={changeHandler}
                        fullWidth
                    />
                    <input
                        className={classes.ordinaryInput}
                        type='file'
                        name='image'
                        ref={inputClick}
                        onChange={fileChangeHandler}/>
                    <TextField
                        disabled
                        name='image'
                        className={classes.fileInput}
                        value={post.image.name ? post.image.name : 'image'}
                        InputLabelProps={{ shrink: true }}
                        fullWidth variant='outlined'
                        label='Click here to choose file'
                        onClick={currentClick}/>
                    <Button
                    type='submit'
                    endIcon={<SendSharpIcon/>}
                    variant='outlined'
                    color='secondary'
                    >
                            POST
                    </Button>
                </form>
            </Grid>

        </Grid>
    );
};

export default NewPost;