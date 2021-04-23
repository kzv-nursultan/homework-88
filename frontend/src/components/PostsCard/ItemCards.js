import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {CardMedia, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
    main:{
        border: '1px solid black',
        margin: '10px auto',
        maxWidth: 800,
    },
    imageBlock: {
        border:'1px solid black',
        margin: '5px',
        marginRight: '15px',
    },
    media: {
        height: 0,
        paddingTop: '100%',
        margin: '5px',
    },
    readButton: {
        margin: 10,
        marginLeft: 'auto'
    }
});

const ItemCards = ({author, title, datetime, image, id}) => {
    const classes = useStyles();
    const history = useHistory();

    const url = 'http://localhost:8000' + image;
    const noImage = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

    const readButtonHandler = () => {
        history.push('/post/' + id);
    };

    return (
        <Grid container className={classes.main} alignItems='center'>
            <Grid item className={classes.imageBlock} xs={3}>
                <CardMedia
                    className={classes.media}
                    image={image ? url : noImage}
                    title="post image"
                />
            </Grid>
            <Grid item xs={8}>
                <Typography variant='h4' component='h2'>
                    Title : {title}
                </Typography>
                <Typography variant='h5' component='h2'>
                    Author: {author}
                </Typography>
                <Typography variant='h5' component='h2'>
                    Datetime : {datetime}
                </Typography>
            </Grid>
            <Button
                variant='outlined'
                color='primary'
                onClick={readButtonHandler}
                className={classes.readButton}
                endIcon={<ChevronRightIcon/>}>
                Read More
            </Button>
        </Grid>
    );
};

export default ItemCards;