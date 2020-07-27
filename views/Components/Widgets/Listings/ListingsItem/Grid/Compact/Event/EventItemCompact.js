import React from "react";
import {ListingsContext} from "../../../../../../../Context/ListingsContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventInfo from "../../../../../../Modals/Events/EventInfo";
import {getDefaultImage, isSet} from "../../../../../../../../library/utils";


class EventItemCompact extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Col sm={12} md={4} lg={4}>
                <div className={"listings-block--item listings-block--item--grid-compact"}>
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

EventItemCompact.contextType = ListingsContext;
export default EventItemCompact;