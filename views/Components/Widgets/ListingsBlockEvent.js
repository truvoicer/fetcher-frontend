import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";
import {getDefaultImage, runSearch} from "../../../library/api/fetcher/search";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventInfo from "../Modals/Events/EventInfo";
import {isSet} from "../../../library/utils";


class ListingsBlockEvent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Col sm={12} md={4} lg={4}>
                <div className={"listings-block--item"}>
                    <div className={"listings-block--item--image"}>
                        <a href="#" className="image">
                            <img className={"default-image"} src={getDefaultImage(this.props.data)}/>
                        </a>
                    </div>
                    <h3 className={"listings-block--item--title"}>{this.props.data.item_name}</h3>
                    <div className={"listings-block--item--actions"}>
                        <a className="button" onClick={this.props.showInfoCallback.bind(this, this.props.data)}>More</a>
                    </div>
                </div>
            </Col>
        )
    }
}

ListingsBlockEvent.contextType = ListingsContext;
export default ListingsBlockEvent;