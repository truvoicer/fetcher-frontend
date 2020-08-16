import React from "react";
import {ListingsContext} from "../../../../../../Context/ListingsContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventInfoModal from "../Events/EventInfoModal";
import {isSet} from "../../../../../../../library/utils";


class RealEstateItemList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Col sm={12} md={12} lg={12}>
                <div className={"listings-block--item listings-block--item--grid-list"}>
                    <div className={"listings-block--item--grid-list--column"}>
                        <div className={"listings-block--item--image"}>
                            <a href="#" className="image">
                                <img className={"default-image"} src={this.props.data.item_image_url}/>
                            </a>
                        </div>
                    </div>
                    <div className={"listings-block--item--grid-list--column"}>
                        <h3 className={"listings-block--item--title"}>{this.props.data.item_title}</h3>
                    </div>
                    <div className={"listings-block--item--grid-list--column"}>
                        <div className={"listings-block--item--price"}>
                            <span>{this.props.data.item_currency}</span>
                            <span>{this.props.data.item_price}</span>
                        </div>
                    </div>
                    <div className={"listings-block--item--grid-list--column"}>
                        <div className={"listings-block--item--actions"}>
                            <a className="button" onClick={this.props.showInfoCallback.bind(this, this.props.data)}>More</a>
                        </div>
                    </div>
                </div>
            </Col>
        )
    }
}

RealEstateItemList.contextType = ListingsContext;
export default RealEstateItemList;