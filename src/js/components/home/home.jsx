import React from "react";
import Nav from 'react-bootstrap/Nav'
import Product from "../products/product";
import {API} from '../constConfig/apiConfig'
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import NavDropdown from "react-bootstrap/NavDropdown";
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
        const handleSelect = (eventKey) => {
            this.setState({activeKey: eventKey, isSearch: false});
        }
        const onChangeHandle = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }
        const handSearch = () => {
            alert(this.searchInput.current.value);
        }

        let menu = null;
        if (this.state.activeKey == 0) {
            menu = " Trang chu"
        } else {

            menu = <Product productCategory={this.state.activeKey}/>
        }
        let productCategoryMenu = null;
        let dropdownProductCategory = null;
        if (this.state.productCategories) {
            productCategoryMenu = this.state.productCategories.map((category, i) => {
                if (i < 4) {
                    return (
                        <Nav.Item>
                            <Nav.Link eventKey={category.id}>
                                {category.name}
                            </Nav.Link>
                        </Nav.Item>
                    )
                }
            });
            if (this.state.productCategories.length >= 5) {
                dropdownProductCategory = this.state.productCategories.map((category, i) => {
                    if (i >= 4) {
                        return (
                            <NavDropdown.Item eventKey={category.id}> {category.name}</NavDropdown.Item>
                        )
                    }
                });
            }

        }
        const style = {
            height: '100vh',
            width: '98vw'
        }
        if (this.state.isLoading) {
            return (
                <div style={style} className=' container-fluid'>
                    <div className='row justify-content-center h-100 '>
                        <div style={{width: '5rem', height: '5rem'}}
                             className="spinner-border text-info align-self-center" role="status">
                        </div>
                    </div>
                </div>
            )
        } else
            return (
                <div style={style} className='container-fluid  '>
                    <Nav className='bg-light sticky-top p-2 rounded pl-5' onSelect={handleSelect} variant="pills"
                         activeKey={this.state.activeKey}>
                        <div style={{font: menu}} className='row col-12 col-sm-8'>
                            <Nav.Item>
                                <Nav.Link eventKey='0'>
                                    Trang chủ
                                </Nav.Link>
                            </Nav.Item>
                            {productCategoryMenu}
                            <NavDropdown title="Xem thêm" id="nav-dropdown">
                                {dropdownProductCategory}
                                abc
                            </NavDropdown>

                        </div>
                        <div className='row col-4 justify-content-end '>
                            <div className="form-inline d-flex justify-content-end">
                                <input  name='searchInput' ref={this.searchInput}
                                       className="form-control mr-sm-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button onClick={handSearch} className="btn btn-outline-success my-2 my-sm-0"
                                        type="submit">Search
                                </button>
                            </div>
                        </div>

                    </Nav>
                    <div className='container'>
                        {menu}
                    </div>
                </div>
            )
    }
}

export default Home
