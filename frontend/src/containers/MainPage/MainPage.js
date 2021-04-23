import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts} from "../../store/actions/PostsActions";
import ItemCard from "../../components/PostsCard/ItemCards";
import Grid from "@material-ui/core/Grid";

const MainPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state=>state.posts.getPosts);

    useEffect(()=>{
        dispatch(getAllPosts());
    },[dispatch]);

    let listOfPosts = 'no posts found';

    if (posts) {
        listOfPosts = (
            posts.map(object=>
                    (
                <ItemCard
                key={object._id}
                author={object.author.username}
                title={object.title}
                image={object.image}
                datetime={object.datetime}
                id={object._id}/>
            )
            )
        )
    };

    return (
        <Grid container justify='center' direction='column'>
            {listOfPosts}
        </Grid>
    );
};

export default MainPage;