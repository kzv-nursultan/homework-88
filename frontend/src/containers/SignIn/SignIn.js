import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import FormInput from "../../components/FormInput/FormInput";
import {makeStyles} from "@material-ui/core/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {loginUser} from "../../store/actions/UsersActions";

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
    errorAlert: {
        maxWidth: 400
    },
    link:{
        float:'right',
        marginTop:'35px',
        fontSize:'small'
    }
})

const SingIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state=>state.user.loginError);
    const loggedUser = useSelector(state=>state.user.loginUser);
    const [user, setUser] = useState({
        username:'',
        password:''
    });

    const onChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({
            ...prevState,
            [name]:value
        }));
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        await dispatch(loginUser('/users/session', {...user}));
    };

    return (
        <Grid container item xs={12} className={classes.mainBlock}>
            <Typography variant='h4' className={classes.title}>
                <PersonAddIcon fontSize='large' color='action'/>
                <br/>
                <strong>sign in</strong>
            </Typography>
            <form onSubmit={onSubmitHandler} className={classes.formBlock}>
                {error && (
                    <Grid item className={classes.errorAlert}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error.error || error.global}
                        </Alert>
                    </Grid>
                )}
                {loggedUser.message && (
                    <Grid item className={classes.errorAlert}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            {loggedUser.message}
                        </Alert>
                    </Grid>
                )}
                <FormInput
                    name={'username'}
                    label={'Username'}
                    onChange={onChangeHandler}
                    required={true}
                    value={user.username}/>
                <FormInput
                    name={'password'}
                    label={'Password'}
                    onChange={onChangeHandler}
                    required={true}
                    value={user.password}
                    type={'password'}/>
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'>
                    Submit
                </Button>
                <Grid item>
                    <NavLink to='/register' className={classes.link}>
                        Are you new?
                    </NavLink>
                </Grid>
            </form>
        </Grid>
    );
};

export default SingIn;