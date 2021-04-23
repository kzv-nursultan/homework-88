import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {CardMedia, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      border: '1px solid brown',
    },
    imageBlock: {
        border:'1px solid black',
        margin: '5px',
        marginRight: '15px',
        width: 320,
    },
    media: {
        height: 0,
        paddingTop: '100%',
        margin: '5px',
    },
})

const OnePostCard = ({title, description, image, author, datetime }) => {
    const classes = useStyles();

    const url = 'http://localhost:8000' + image;
    const noImage = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

    return (
        <Grid container item className={classes.root} alignItems='center'>
            <Grid item className={classes.imageBlock}>
                <CardMedia
                    className={classes.media}
                    title='Post image'
                    image={image ? url : noImage}
                />
            </Grid>
            <Grid item>
                <Typography variant='h4'>
                    Title: <strong>{title}</strong>
                </Typography>
                <Typography variant='h4'>
                    Description: <strong>{description}</strong>
                </Typography>
                <Typography variant='h4'>
                    Posted by <strong>{author}</strong> at <i>{datetime}</i>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default OnePostCard;