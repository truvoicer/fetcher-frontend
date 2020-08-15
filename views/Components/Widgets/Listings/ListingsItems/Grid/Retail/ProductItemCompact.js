import React from "react";
import {ListingsContext} from "../../../../../../Context/ListingsContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventInfoModal from "../Events/EventInfoModal";
import {getDefaultImage, isSet} from "../../../../../../../library/utils";


class ProductItemCompact extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        // console.log(this.props.data)
        return (
            <Col sm={12} md={6} lg={6}>
                <div className="d-block d-md-flex listing vertical">
                    <a href="#" className="img d-block"
                       style={{backgroundImage: "url('" + this.props.data.item_image_url + "')"}}/>
                    <div className="lh-content">
                        <span className="category">Cars &amp; Vehicles</span>
                        <a href="#" className="bookmark">
                            <span className="icon-heart"></span>
                        </a>
                        <h3><a href="#"
                               onClick={this.props.showInfoCallback.bind(this, this.props.data)}>{this.props.data.item_title}</a>
                        </h3>
                        {/*<p>{}</p>*/}
                        <p className="mb-0">
                            <span className="icon-star text-warning"></span>
                            <span className="icon-star text-warning"></span>
                            <span className="icon-star text-warning"></span>
                            <span className="icon-star text-warning"></span>
                            <span className="icon-star text-secondary"></span>
                            <span className="review">(3 Reviews)</span>
                        </p>
                    </div>
                </div>
            </Col>
        )
    }
}

ProductItemCompact.contextType = ListingsContext;
export default ProductItemCompact;