import React from "react";
import {Redirect} from "react-router-dom";
import axios from 'axios';

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}

class Home extends React.Component {
    constructor() {
        super();
        this.state = ({
            rooms: null,
            messages:[],
            isLoading:true,
            tableSelected:null
        });
    }

    componentDidMount() {
        axios.get('http://localhost/api/rooms')
            .then(res => {
                this.setState({
                    rooms: res.data.data,
                    isLoading:false,
                    tableSelected:res.data.data[0].id
                })
            })
    }
    logOut=()=>{
        localStorage.removeItem('access_token');
        this.forceUpdate();
    }
    roomClickHandle=(e)=>{
        if(this.state.messages.length != 0){
            let ishave=false;
           for(var i=0; i<this.state.messages.length;i++){
               if(parseInt(this.state.messages[i][0].room_id)===parseInt(e.target.dataset.roomid)){
                   ishave=true;
                   break;

               }
           }
           if(ishave!=true){
               axios.post('http://localhost/api/rooms/messages',{room_id:e.target.dataset.roomid})
                   .then(res => {
                       this.setState({
                           messages:this.state.messages.concat([res.data.data])
                       });
                   })
           }
        }else{
            axios.post('http://localhost/api/rooms/messages',{room_id:e.target.dataset.roomid})
                .then(res => {
                    this.setState({
                        messages:this.state.messages.concat([res.data.data])
                    });
                })
        }

    }
    render() {
        const style = {
            height: '100vh',
            width: '100vw'
        }
        if (localStorage.getItem('access_token') != null) {
           if(!this.state.isLoading){
               let rooms = [];
               if (this.state.rooms) {
                   rooms = this.state.rooms.map((room) => (
                       <div  key={room.id}  className="border rounded mt-2"><div data-roomid={room.id}  key={room.id}  onClick={(e)=>this.roomClickHandle(e)} className={'p-3'}>{room.name}</div></div>
                   ));
               }

               return (
                   <div style={style} className={'container-fluid bg-dark'}>
                       <div style = {{height: '7%'}} className='row'>
                           <div className='col-2 text-white align-self-center text-center  '>
                               HELL
                           </div>
                           <div className='col-10 d-flex align-self-center justify-content-end'>
                               <button style={{height:'40px'}} onClick={this.logOut} className='btn btn-dark text-danger'>Đăng xuất</button>
                           </div>
                       </div>
                       <div style = {{height: '93%'}} className={'row'}>
                           <div className={'col-2  rounded-right bg-white h-100'}>
                               <div className="text-black ">
                                   {rooms}
                               </div>
                           </div>
                           <div className={'col-10 '}>
                            <div className='row ml-1 mr-1 bg-white rounded h-100'>
                                {this.state.messages.length}
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
