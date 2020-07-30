import React from "react";
import {Redirect} from "react-router-dom";
import axios from 'axios';

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}

class Home extends React.Component {
    constructor() {
        super();
        this.state = ({
            tables: null,
            isLoading:true
        });
    }

    componentDidMount() {
        axios.get('http://localhost/api/rooms')
            .then(res => {
                this.setState({
                    tables: res.data.data,
                    isLoading:false
                })
            })
    }

    render() {
        const style = {
            height: '100vh',
            width: '100vw'
        }
        if (localStorage.getItem('access_token') != null) {
           if(!this.state.isLoading){
               let tables = [];
               if (this.state.tables) {
                   tables = this.state.tables.map((table) => (
                       <div className="border rounded mt-2"><div className={'p-3'}>{table.name}</div></div>
                   ));
               }

               return (
                   <div style={style} className={'container-fluid bg-dark'}>
                       <div style = {{height: '5%'}} className='row'>
                           <div className='col-2 text-white text-center '>
                               HELL
                           </div>
                           <div className='col-12'>

                           </div>
                       </div>
                       <div style = {{height: '95%'}} className={'row'}>
                           <div className={'col-2 rounded-right bg-white h-100'}>
                               <div className="text-black ">
                                   {tables}
                               </div>
                           </div>
                           <div className={'col-10 '}>
                            <div className='bg-white rounded h-100'>
                            </div>
                           </div>
                       </div>

                   </div>
               );
           }else{
               return (
                   <div style={style} className=' container-fluid bg-dark'>
                      <div className='row justify-content-center h-100 '>
                          <div style = {{width: '5rem',height: '5rem'}} className="spinner-border text-light align-self-center" role="status">
                          </div>
                      </div>
                   </div>
               )
           }
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default Home
