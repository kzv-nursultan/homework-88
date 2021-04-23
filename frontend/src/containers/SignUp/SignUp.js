import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import FormInput from "../../components/FormInput/FormInput";
import {makeStyles} from "@material-ui/core/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {postUser} from "../../store/actions/UsersActions";
import {NavLink} from "react-router-dom";
import {Alert, AlertTitle} from "@material-ui/lab";

const useStyles = makeStyles({
    formBlock: {
        display: 'block',
        margin: '10px auto',
        textAlign: 'center'
    },
    mainBlock: {
        flexDirection:'column',
        textAlign:"center",
    },
    title: {
        textTransform:'uppercase',
        marginTop:10,
    },
    link:{
        float:'right',
        marginTop:'35px',
        fontSize:'small'
    }
});

const SingUp = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username:'',
        password:''
    });
    const error = useSelector(state => state.user.error);
    const newUser = useSelector(state=>state.user.data);

    const onChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({
            ...prevState,
            [name]:value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        };
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        await dispatch(postUser('/users', {...user}));
    };

    return (
        <Grid container item xs={12} className={classes.mainBlock}>
            <Typography variant='h4' className={classes.title}>
                <PersonAddIcon fontSize='large' color='action'/>
                <br/>
                <strong>sign up</strong>
            </Typography>
            <form onSubmit={onSubmitHandler} className={classes.formBlock}>
                {newUser._id && (
                    <Grid item className={classes.errorAlert}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            You have successfully registered!
                        </Alert>
                    </Grid>
                )}
                <FormInput
                    name='username'
                    label='Username'
                    onChange={onChangeHandler}
                    required={true}
                    value={user.username}
                    error={Boolean(getFieldError('username'))}
                    helperText={getFieldError('username')}/>

                <FormInput
                    name='password'
                    label='Password'
                    onChange={onChangeHandler}
                    required={true}
                    value={user.password}
                    type='password'
                    error={Boolean(getFieldError('password'))}
                    helperText={getFieldError('password')}/>
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'>
                    Submit
                </Button>
                <Grid item>
                    <NavLink to='/login' className={classes.link}>
                        Already registered?
                    </NavLink>
                </Grid>
            </form>
        </Grid>
    );
};

export default SingUp;