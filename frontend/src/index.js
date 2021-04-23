import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store/configureStore";
import './index.css';
import App from './App';
import {Provider} from "react-redux";


const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render( app,document.getElementById('root'));
