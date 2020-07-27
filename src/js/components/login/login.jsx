import React, {Component} from "react";
class login extends Component{
    constructor() {
        super();
        this.state={
            username:'',
            password:'',
            show:false
        }
    }
    handleDismissle(){
        this.setState({
            show: !this.state.show
        });
    }
    handleLogin(){
        alert(this.state.password);
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
console.log(e.target.name)
    }

    render() {
        const style={
            height:'100vh',
            width:'100vw'
        }
        let alertBody;
        if(this.state.show){
            alertBody=<div class={'alert alert-danger'} dismissible onClose={()=>this.handleDismissle()}>This is aler</div>
        }
        return (
            <div style={style} className={"bg-dark"}>
               <div  className={'container h-100'}>
                   <div className={' row justify-content-center  align-items-center h-100'}>
                       <div className={'col-3 align-self-center'}>
                               <div className={'form-group'}>
                                   <input type='text' name={'username'}   value={this.state.username} onChange={e=>this.handleChange(e)}  className={'form-control  text-center'} placeholder={'Username'}/>
                               </div>
                               <div className={'form-group'}>
                                   <input type='password' name={'password'}  value={this.state.password} onChange={e=>this.handleChange(e)} className={'form-control text-center'} placeholder={'Password'}/>
                               </div>
                               <div className={'d-flex justify-content-center'}>
                                   <button onClick={()=>this.handleLogin()} className={'btn btn-primary'}>Login</button>
                               </div>
                       </div>
                       abc
                       {alertBody}
                   </div>
               </div>
            </div>

        )
    }
}
export default login
