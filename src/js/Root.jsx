import React, {Component} from "react";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./components/home/home.jsx";
import Product from "./components/products/product";
import  {BrowserRouter as Router,Route} from 'react-router-dom'
class Root extends Component{
    render() {
        return (
            <Router>
                <Route exact path='/' component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/quan-ao-nam' component={Product}/>
            </Router>
        )
    }
}
export default Root
