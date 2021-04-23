import './App.css';
import MainPage from "./containers/MainPage/MainPage";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ButtonAppBar from "./containers/AppBar/AppBar";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIn";
import NewPost from "./containers/NewPost/NewPost";
import OnePostPage from "./containers/OnePostPage/OnePostPage";

const App = () => {
  return (
    <BrowserRouter>
        <ButtonAppBar/>
          <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/register' component={SignUp}/>
            <Route path='/login' component={SignIn}/>
            <Route path='/addPost' component={NewPost}/>
            <Route path='/post/:id' component={OnePostPage}/>
          </Switch>
    </BrowserRouter>
  );
}

export default App;
