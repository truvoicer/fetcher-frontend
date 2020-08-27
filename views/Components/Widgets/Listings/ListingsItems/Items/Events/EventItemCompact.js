import React from "react";
import Col from "react-bootstrap/Col";
import {formatDate, getDefaultImage, isSet, uCaseFirst} from "../../../../../../../library/utils";


class EventItemCompact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: null
        }
        console.log(this.props.data.saved_item)
        this.saveItemClickHandler = this.saveItemClickHandler.bind(this)
    }

    saveItemClickHandler(e) {
        this.props.saveItemCallback(
            this.props.data.provider,
            this.props.searchCategory,
            this.props.data.item_id
        )
        let saved = false;
        if (!this.state.saved) {
            saved = true
        }
        this.setState({
            saved: saved
        })
    }

    render() {
        return (
            <Col sm={12} md={6} lg={4}>
                <div className="d-block d-md-flex listing vertical">
                    <a href="#" className="img d-block"
                       style={{backgroundImage: "url('" + getDefaultImage(this.props.data) + "')"}}/>
                    <div className="lh-content">
                        <span className="category">{uCaseFirst(this.props.data.provider)}</span>
                        <a
                            onClick={this.saveItemClickHandler}
                            className={"bookmark" + (this.props.data.saved_item? " saved" : "")}
                        >
                            <span className="icon-heart"></span>
                        </a>
                        <h3><a href="#"
                               onClick={this.props.showInfoCallback.bind(this, this.props.data)}>{this.props.data.item_name}</a>
                        </h3>
                        <p>{this.props.data.item_venue}</p>
                        <p>{this.props.data.item_start_date}</p>
                        {/*<p>{formatDate(this.props.data.item_start_date)}</p>*/}
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
export default EventItemCompact;