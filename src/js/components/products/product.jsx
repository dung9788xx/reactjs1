import React from "react";
class Product extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                Category id:{this.props.productCategory}
            </div>
        );
    }
}
export default Product
