import React from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {Menu, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {logOutUser} from "../../store/actions/UsersActions";

const useStyle = makeStyles({
    header: {
        color: 'white',
        fontWeight:'bold'
    }
});

const LoggedInUser = ({username}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const historyHandler = () => {
        history.push('/addPost');
    };

    const loggingOut = async () => {
        await dispatch(logOutUser());
        history.push('/');
    };

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.header}
            >
                Hello, {username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={loggingOut}> Logout</MenuItem>
                <MenuItem onClick={historyHandler}> Add new Post</MenuItem>
            </Menu>
        </>
    );
};

export default LoggedInUser;