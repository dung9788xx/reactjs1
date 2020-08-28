import React from "react";
import axios from "axios";
import {API} from "../constConfig/apiConfig";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            productCategories: null,
            activeKey: props.activeKey,
            searchInput: '',
            isSearch: false,
            isLoading: true,
        });
        this.searchInput = React.createRef();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            activeKey:nextProps.activeKey
        })
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


    render() {
        let productCategoryMenu = null;
        let dropdownProductCategory = null;
        if (this.state.productCategories) {
            productCategoryMenu = this.state.productCategories.map((category, i) => {
                if (i < 4) {
                    return (
                        <Nav.Item key={i}>
                            <Nav.Link  href={'/productCategory/'+category.id} eventKey={category.id}>
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
                            <NavDropdown.Item key={i}  href={'/productCategory/'+category.id}  eventKey={category.id}> {category.name}</NavDropdown.Item>
                        )
                    }
                });
            }

        }
        const handleSelect = (eventKey) => {
            this.props.handleSelectMenu(eventKey)
        }
        const onChangeHandle = (e) => {
            this.setState({[e.target.name]: e.target.value});
        }
        const handSearch = () => {
        }

        const style = {
            width: '98vw'
        }
        // if (this.state.isLoading) {
        //     return (
        //         <div style={style} className=' container-fluid'>
        //             <div className='row justify-content-center h-100 '>
        //                 <div style={{width: '5rem', height: '5rem'}}
        //                      className="spinner-border text-info align-self-center" role="status">
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // } else
            return (
            <div style={style} className='container-fluid  '>
                <Nav className='bg-light sticky-top p-2 rounded pl-5' onSelect={handleSelect} variant="pills"
                     activeKey={this.state.activeKey}>
                    <div  className='row col-12 col-sm-8'>
                        <Nav.Item>
                            <Nav.Link eventKey='0'>
                                Trang chủ
                            </Nav.Link>
                        </Nav.Item>
                        {productCategoryMenu}
                        <NavDropdown title="Xem thêm" id="nav-dropdown">
                            {dropdownProductCategory}
                        </NavDropdown>

                    </div>
                    <div className='row col-12 col-sm-4 justify-content-end '>
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
            </div>
        )
    }
}
export default Header
