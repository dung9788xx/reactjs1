import React from "react";
import {Redirect} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Register from "../register/register";
import Product from "../products/product";
import {API} from '../constConfig/apiConfig'
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import axios from 'axios';

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}

class Home extends React.Component {
    constructor() {
        super();
        this.state = ({
            productCategories: null,
            activeKey:0,
            toggleStatus:0,
            isLoading:true
        });
    }

    componentDidMount() {
        axios.get(API+'/list-product-category')
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    isLoading:false,
                    productCategories: res.data.data,
                })
            })
    }

    logOut = () => {
        localStorage.removeItem('access_token');
        this.forceUpdate();
    }

    render() {
       const handleSelect = (eventKey) =>{
           this.setState({activeKey:eventKey});
       }
       const handleSelectToggle = (eventKey) =>{
            this.setState({toggleStatus:this.state.toggleStatus ==1 ? 0:1});
        }

       let menu=null;
       if(this.state.activeKey==0){
           menu=" Trang chu"
       }else{

           menu=<Product productCategory={this.state.activeKey}/>
       }
       let show=(this.state.toggleStatus == 1) ? 'visible':'invisible h-0';
        let productCategoryMenu=null;
        let dropdownProductCategory=null;
        if(this.state.productCategories) {
           productCategoryMenu = this.state.productCategories.map((category, i) => {
               if(i<5){
                   return (
                       <Nav.Item>
                           <Nav.Link eventKey={category.id}>
                               {category.name}
                           </Nav.Link>
                       </Nav.Item>
                   )
               }
           });
           if(this.state.productCategories.length >=5){
               dropdownProductCategory= this.state.productCategories.map((category, i) => {
                   if(i>=5){
                       return (
                           <Nav.Item>
                               <Nav.Link eventKey={category.id}>
                                   {category.name}
                               </Nav.Link>
                           </Nav.Item>
                       )
                   }
               });
           }

       }
        let dropdownIcon=null;
        if(this.state.toggleStatus==1){

            dropdownIcon= <svg width="1em" height="1em" viewBox="0 0 16 16"
                               className="bi bi-chevron-double-up" fill="currentColor"
                               xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                <path fill-rule="evenodd"
                      d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
            </svg>
        }else{
            dropdownIcon=<svg width="1em" height="1em" viewBox="0 0 16 16"
                              className="bi bi-chevron-double-down" fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                <path fill-rule="evenodd"
                      d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        }
        const style = {
            height: '100vh',
            width:'98vw'
        }
        if(this.state.isLoading){
            return (
                <div style={style} className=' container-fluid'>
                    <div className='row justify-content-center h-100 '>
                        <div style = {{width: '5rem',height: '5rem'}} className="spinner-border text-info align-self-center" role="status">
                        </div>
                    </div>
                </div>
            )
        }else
        return (
            <div style={style} className='container-fluid  '>
                   <Nav className='bg-light sticky-top p-2 rounded pl-5' onSelect={handleSelect} variant="pills" activeKey={this.state.activeKey} >
                      <div style={{font:menu}} className='row col-12 col-sm-8'>
                          <Nav.Item>
                              <Nav.Link eventKey='0'>
                                  Trang chủ
                              </Nav.Link>
                          </Nav.Item>
                          {productCategoryMenu}
                          <Nav.Item>
                                  <div className='mt-1' onClick={handleSelectToggle}>
                                      {dropdownIcon}
                                  </div>

                          </Nav.Item>

                          <div style={{height: this.state.toggleStatus==0 ? '0px':''}} className={'row col-12 '+show}>
                              <div className='row'>
                                  {dropdownProductCategory}
                              </div>
                          </div>
                          {/*<NavDropdown title="Dropdown" id="nav-dropdown">*/}
                          {/*    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>*/}
                          {/*    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>*/}
                          {/*    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>*/}
                          {/*    <NavDropdown.Divider />*/}
                          {/*    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>*/}
                          {/*</NavDropdown>*/}
                      </div>
                      <div className='row col-12  col-sm-4 justify-content-end '>
                              <form className="form-inline d-flex justify-content-end">
                                  <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                         aria-label="Search"/>
                                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                              </form>
                      </div>

                   </Nav>

                  {menu}

            </div>
        )
    }
}

export default Home
