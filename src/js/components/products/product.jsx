import React from "react";
import axios from "axios";
import {Link } from "react-router-dom";
import {API} from "../constConfig/apiConfig";
import {  useParams } from 'react-router-dom';
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true,
            category_id:props.category_id,
            products: []
        })

    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isLoading: true,
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
    changeColor=(e)=>{
            e.currentTarget.classList.add('bg-light')
    }

    render() {

        const cardStyle = {
            height:'24rem',
            width:'28rem'
        }
        const imgStyle = {
            height: '14rem',
            'maxWidth': '14rem',
            'objectFit': 'cover'
        }
        let product = this.state.products.map((product, index) => {
            return (
                <div key={index} style={cardStyle} onClick={()=>{  this.props.history.push('/');
                }}  onMouseOver={this.changeColor} onMouseOut={(e)=>e.currentTarget.classList.remove('bg-light')}  className="col-12 col-sm-4 col-md-3 col-lg-2 p-0 m-2 card shadow rounded ">
                <div className='row justify-content-center'>

                       <img style={imgStyle} className="overflow-hidden col-12"
                            src="https://img.docbao.vn/images/uploads/2019/08/30/photo-2-15671450584281783784590.jpg"
                            alt="Card image cap"/>
                       <div className="col-12">
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
                </div>
            )
        })
        const style = {
            height: '80vh',
            width: '80vw'
        }
        if (this.state.isLoading) {
            return (
                <div style={style} className=' container'>
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
                    <div className='container-fluid pl-5'>
                          <div className='row ml-5 '>
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
                    <div style={style} className='container'>
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
