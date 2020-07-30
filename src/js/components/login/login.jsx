import React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import axios from 'axios';

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            show: false,
            isSuccess:false,
            isShowSpinner: false
        }
    }

    handleDismissle() {
        this.setState({
            show: !this.state.show
        });
    }
    enterHandle(e){
        if(e.key === 'Enter' ){
            this.handleLogin();
        }
    }
    handleLogin() {
        axios.post('http://localhost/api/login', {
            'email': this.state.email,
            'password': this.state.password
        }).then(res => {
            this.setState({
                isShowSpinner: false,
            })
            if (res.data.code !== 200) {
                this.setState({
                    show: true,
                },()=>{
                    setTimeout(()=>{
                        this.setState({show:false})
                    },2000)
                })
            }else{
                localStorage.setItem('access_token',res.data.data.access_token);
                localStorage.setItem('user_name',<res className="data data user name"></res>);
                this.setState({
                    isSuccess: true,
                });

            }

        })
        this.setState({
            isShowSpinner: true
        })
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if(this.state.isSuccess){
            return <Redirect to="/" />
        }
        const style = {
            height: '100vh',
            width: '100vw'
        }
        let alertBody;
        if (this.state.show) {
            alertBody =
                <div className={'alert alert-danger'} dismissible onClose={() => this.handleDismissle()}>Invalid username or
                    password !</div>
        }
        let spinner;
        if (this.state.isShowSpinner) {
            spinner = <div className="spinner-border text-primary"></div>
        }
        return (
            <div style={style} className={'container-fluid bg-dark'}>
                <div className={'row align-items-center justify-content-center h-100'}>
                    <div className={'col-3 text-center'}>
                        <h3 className={'text-light mb-4'}>WELLCOME TO HELL!</h3>
                        <div className={'form-group'}>
                            <input onKeyDown={(e)=>this.enterHandle(e)} name={'email'} value={this.state.email} onChange={e=>this.handleChange(e)} className={'form-control text-center'} type={'email'} placeholder={'Email'}/>
                        </div>
                        <div className={'form-group '}>
                            <input name={'password'} onKeyDown={(e)=>this.enterHandle(e)} value={this.state.password} onChange={e=>this.handleChange(e)} className={'form-control text-center'} type={'password'} placeholder={'Password'}/>
                        </div>
                        <div className={'form-group '}>
                            <button onKeyDown={(e)=>this.enterHandle(e)}  onClick={() => this.handleLogin()} className={'btn btn-primary'}>Login</button>
                        </div>
                        <div style={{height:'20px'}} className={'form-group'}>
                            {spinner}
                            {alertBody}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default login
