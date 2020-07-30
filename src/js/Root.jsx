import React, {Component} from "react";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./components/home/home";
import  {BrowserRouter as Router,Route} from 'react-router-dom'
class Root extends Component{
    render() {
        return (
            <Router>
                <Route exact path='/' component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
            </Router>
        )
    }
}
export default Root
