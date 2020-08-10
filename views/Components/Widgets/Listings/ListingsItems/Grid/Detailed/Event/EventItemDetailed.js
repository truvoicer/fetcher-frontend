import React from "react";
import Col from "react-bootstrap/Col";
import {getDefaultImage, isSet} from "../../../../../../../../library/utils";


class EventItemDetailed extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Col sm={12} md={6} lg={6}>
                <div className={"listings-block--item listings-block--item--grid-detailed"}>
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
export default EventItemDetailed;