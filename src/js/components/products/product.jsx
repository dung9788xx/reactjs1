import React from "react";
import axios from "axios";
import {API} from "../constConfig/apiConfig";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true,
            category_id: this.props.productCategory,
            products: []
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isLoading:true,
            products: [],
            category_id: nextProps.productCategory
        }, () => {
            this.fetchDat();
        })
    }

    fetchDat() {
        axios.get(API + '/product-by-category', {
            params: {
                category_id: this.state.category_id
            }
        })
            .then(res => {
                this.setState({
                    isLoading: false,
                    products: res.data.data
                })
                console.log(this.state.products)
            })
            .catch(e =>
                alert(e)
            )
    }

    componentDidMount() {
        this.fetchDat();
    }

    render() {
        const imgStyle = {
            height: '11rem',
            width: '10rem',
            'object-fit': 'contain'
        }
        let product = this.state.products.map((product, index) => {
            return (
                <div className="col-2 card m-2">
                    <img style={imgStyle} className="card-img-top"
                         src="https://img.docbao.vn/images/uploads/2019/08/30/photo-2-15671450584281783784590.jpg"
                         alt="Card image cap"/>
                    <hr/>
                    <div className="card-body">
                        <div>
                            {product.name}
                        </div>
                        <div>
                                    <span className='text-danger'>
                                        {product.price}
                                    </span>
                        </div>
                    </div>
                </div>
            )
        })
        const style = {
            height: '80vh',
            width: '80vw'
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

        } else {
            if (this.state.products.length != 0) {
                return (
                    <div className='container'>
                        <div className='row pl-5 ml-2 '>
                            {product}
                            {product}
                            {product}
                            {product}
                            {product}
                            {product}
                            {product}

                        </div>
                    </div>
                );
            } else {
                return (
                    <div style={style} className='container-fluid'>
                        <div className='row justify-content-center h-100 '>
                            <div className=' align-self-center'>Không có sản phẩm nào !</div>
                        </div>
                    </div>
                )
            }

        }

    }
}

export default Product
