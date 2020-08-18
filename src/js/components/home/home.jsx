import React from "react";
import {Redirect} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Register from "../register/register";
import Product from "../products/product";
import {API} from '../constConfig/apiConfig'
import axios from 'axios';

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}

class Home extends React.Component {
    constructor() {
        super();
        this.state = ({
            productCategories: null,
            activeKey:0,
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
       let menu=null;
       if(this.state.activeKey==0){
           menu=" Trang chu"
       }else{

           menu=<Product productCategory={this.state.activeKey}/>
       }
       let productCategoryMenu= this.state.productCategories ? this.state.productCategories.map((category,i)=>{
           return (
               <Nav.Item>
                   <Nav.Link eventKey={category.id}>
                       {category.name}
                   </Nav.Link>
               </Nav.Item>
           )
       }) : null;
        const style = {
            height: '100vh',
            width:'100vw'
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
                   <Nav className='bg-light sticky-top p-2 rounded' onSelect={handleSelect} variant="pills" activeKey={this.state.activeKey} >
                      <div style={{font:menu}} className='row col-8'>
                          <Nav.Item>
                              <Nav.Link eventKey='0'>
                                  Trang chủ
                              </Nav.Link>
                          </Nav.Item>
                          {productCategoryMenu}
                          {/*<NavDropdown title="Dropdown" id="nav-dropdown">*/}
                          {/*    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>*/}
                          {/*    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>*/}
                          {/*    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>*/}
                          {/*    <NavDropdown.Divider />*/}
                          {/*    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>*/}
                          {/*</NavDropdown>*/}
                      </div>
                      <div className='row col-4 justify-content-end '>
                              <form className="form-inline d-flex justify-content-end">
                                  <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                         aria-label="Search"/>
                                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                              </form>
                      </div>
                   </Nav>
                {menu}
                {/*<div className='row'>*/}
                {/*    <div className='col-12 col-sm-6 col-lg-4 bg-info'>*/}
                {/*        <p className="lead">*/}
                {/*            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non*/}
                {/*            commodo luctus.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className='col-12 col-sm-6 col-lg-4  bg-danger'>*/}
                {/*        <p>You can use the mark tag to <mark>highlight</mark> text.</p>*/}
                {/*        <p><del>This line of text is meant to be treated as deleted text.</del></p>*/}
                {/*        <p><s>This line of text is meant to be treated as no longer accurate.</s></p>*/}
                {/*        <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>*/}
                {/*        <p><u>This line of text will render as underlined</u></p>*/}
                {/*        <p><small>This line of text is meant to be treated as fine print.</small></p>*/}
                {/*        <p><strong>This line rendered as bold text.</strong></p>*/}
                {/*        <p><em>This line rendered as italicized text.</em></p>*/}
                {/*    </div>*/}
                {/*    <div className='col-12 col-sm-6 col-lg-4  bg-warning'>*/}
                {/*        c*/}
                {/*    </div>*/}
                {/*    <div className='col-12 col-sm-6 col-lg-4  bg-danger'>*/}
                {/*        d*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Home
