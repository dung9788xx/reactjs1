import React,{Component} from "react";
import {Redirect} from "react-router-dom";
class Home extends React.Component{
    render() {
        console.log(localStorage.getItem('token') );
        if(localStorage.getItem('token') != null){
            return (
                <div>
                    Chao ban
                </div>
            );
        }else{
            return <Redirect to="/login" />
        }

    }
}
export default Home
