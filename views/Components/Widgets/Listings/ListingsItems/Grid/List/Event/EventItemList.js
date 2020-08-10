import React from "react";
import {ListingsContext} from "../../../../../../../Context/ListingsContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventInfo from "../../../../../../Modals/Events/EventInfo";
import {getDefaultImage, isSet} from "../../../../../../../../library/utils";


class EventItemList extends React.Component {
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
                                <img className={"default-image"} src={getDefaultImage(this.props.data)}/>
                            </a>
                        </div>
                    </div>
                    <div className={"listings-block--item--grid-list--column"}>
                        <h3 className={"listings-block--item--title"}>{this.props.data.item_name}</h3>
                    </div>
                    <div className={"listings-block--item--grid-list--column"}>
                        <div className={"listings-block--item--info"}>
                            {this.props.data.item_description}
                        </div>
                    </div>
                    <div className={"listings-block--item--grid-list--column"}>
                        <div className={"listings-block--item--dates"}>
                            <span>Start Date:</span>
                            <span>{this.props.data.item_start_date}</span>
                        </div>
                    </div>
                    <div className={"listings-block--item--grid-list--column"}>

                    </div>
                    <div className={"listings-block--item--grid-list--column"}>

                    </div>
                    <div className={"listings-block--item--grid-list--column"}>
                        <div className={"listings-block--item--actions"}>
                            <a className="button"
                               onClick={this.props.showInfoCallback.bind(this, this.props.data)}>More</a>
                        </div>
                    </div>
                </div>
            </Col>
        )
    }
}

EventItemList.contextType = ListingsContext;
export default EventItemList;