import React from "react";
import Nav from 'react-bootstrap/Nav'
import Product from "../products/product";
import {API} from '../constConfig/apiConfig'
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "react-router-dom";
import axios from 'axios';

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}

class Home extends React.Component {
    constructor() {
        super();
        this.state = ({
            productCategories: null,
            activeKey: 0,
            searchInput: '',
            isSearch: false,
            isLoading: true,
        });
        this.searchInput = React.createRef();
    }

    componentDidMount() {
        axios.get(API + '/list-product-category')
            .then(res => {
                this.setState({
                    isLoading: false,
                    productCategories: res.data.data,
                })
            })
            .catch(e =>
                alert(e)
            )
    }

    logOut = () => {
        localStorage.removeItem('access_token');
        this.forceUpdate();
    }

    render() {

        const onChangeHandle = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }
        const handSearch = () => {
            alert(this.searchInput.current.value);
        }

        let menu = null;
        if (this.state.activeKey == 0) {
            menu = <Link to={'/login'}>aaaa</Link>
        } else {

            menu = <Product productCategory={this.state.activeKey}/>
        }

            return (
                <div></div>
                // <div style={style} className='container-fluid  '>
                //     <Nav className='bg-light sticky-top p-2 rounded pl-5' onSelect={handleSelect} variant="pills"
                //          activeKey={this.state.activeKey}>
                //         <div  className='row col-12 col-sm-8'>
                //             <Nav.Item>
                //                 <Nav.Link eventKey='0'>
                //                     Trang chủ
                //                 </Nav.Link>
                //             </Nav.Item>
                //             {productCategoryMenu}
                //             <NavDropdown title="Xem thêm" id="nav-dropdown">
                //                 {dropdownProductCategory}
                //             </NavDropdown>
                //
                //         </div>
                //         <div className='row col-12 col-sm-4 justify-content-end '>
                //             <div className="form-inline d-flex justify-content-end">
                //                 <input  name='searchInput' ref={this.searchInput}
                //                        className="form-control mr-sm-2" type="search" placeholder="Search"
                //                        aria-label="Search"/>
                //                 <button onClick={handSearch} className="btn btn-outline-success my-2 my-sm-0"
                //                         type="submit">Search
                //                 </button>
                //             </div>
                //         </div>
                //
                //     </Nav>
                //     <div className='container-fluid'>
                //         {menu}
                //     </div>
                // </div>
            )
    }
}

export default Home
