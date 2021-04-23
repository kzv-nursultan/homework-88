import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    comment: {
        margin: '10px auto',
        textAlign:'center',
        border: '1px solid black',
        padding: 20,
    },
    title: {
        textAlign: 'center',
    }
})

const CommentCard = ({author, text, datetime}) => {
    const classes = useStyles();

    return (
        <Grid container item xs={9} className={classes.comment}>
            <Typography variant='h4' className={classes.title}>
                <strong>{author}</strong> said:  <strong>{text}</strong>
            </Typography>
            <Typography variant='h5'>
                Datetime: {datetime}
            </Typography>
        </Grid>
    );
};

export default CommentCard;