import React from "react";
import Col from "react-bootstrap/Col";
import {formatDate, getDefaultImage, isSet, uCaseFirst} from "../../../../../../../library/utils";


class EventItemDetailed extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Col sm={12} md={6} lg={6}>
                <div className="d-block d-md-flex listing vertical">
                    <a href="#" className="img d-block"
                       style={{backgroundImage: "url('" + getDefaultImage(this.props.data) + "')"}}/>
                    <div className="lh-content">
                        <span className="category">{uCaseFirst(this.props.data.provider)}</span>
                        <a href="#" className="bookmark">
                            <span className="icon-heart"></span>
                        </a>
                        <h3><a href="#"
                               onClick={this.props.showInfoCallback.bind(this, this.props.data)}>{this.props.data.item_name}</a>
                        </h3>
                        <p>{this.props.data.item_venue}</p>
                        <p>{formatDate(this.props.data.item_start_date)}</p>
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
export default EventItemDetailed;