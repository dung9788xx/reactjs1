import React, {Component} from "react";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./components/home/home.jsx";
import Product from "./components/products/product";
import Header from "./components/header/header";
import  {BrowserRouter as Router,Route} from 'react-router-dom'
class Root extends Component{
    constructor() {
        super();
        this.state = ({
            activeKey: sessionStorage.getItem('activeKey') ?? 0,
        });

    }
    handleSelect = (eventKey) => {
        sessionStorage.setItem('activeKey',eventKey)
    }
    render() {
        return (
           <div>
               <Router>
                   <Header handleSelectMenu={this.handleSelect} activeKey={this.state.activeKey}/>
                   <Route exact path='/' component={Home}/>
                   <Route path='/register' component={Register}/>
                   <Route path='/login' component={Login}/>
                   <Route path='/productCategory/:id' render={(props)=><Product category_id={props.match.params.id}  />}/>
               </Router>
           </div>
        )
    }
}
export default Root
