import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {postReducer} from "./reducers/postReducer";
import {usersReducer} from "./reducers/userReducer";
import {commentReducer} from "./reducers/commentReducer";
import thunk from "redux-thunk";

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('forumUser', serializedState);
    } catch (error) {
        console.log('Could not save to local storage');
    };
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('forumUser');
        if (serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    };
};

const rootReducer = combineReducers({
    posts: postReducer,
    user : usersReducer,
    comments: commentReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancer(applyMiddleware(thunk));
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(()=>{
    saveToLocalStorage({
        user: store.getState().user
    });
});

export default store;