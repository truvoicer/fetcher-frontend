import React from "react";
import Col from "react-bootstrap/Col";
import {formatDate, getDefaultImage, isSet, uCaseFirst} from "../../../../../../../library/utils";
import {SESSION_USER, SESSION_USER_ID} from "../../../../../../../redux/constants/session-constants";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../../../../../redux/middleware/listings-middleware";
import {
    saveItemMiddleware,
    setSearchRequestOperationMiddleware,
    setSearchRequestStatusMiddleware, updateSavedItemMiddleware
} from "../../../../../../../redux/middleware/search-middleware";


class EventItemCompact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: false
        }
    }

    render() {
        return (
            <div className="d-block d-md-flex listing vertical">
                <a href="#" className="img d-block"
                   style={{backgroundImage: "url('" + getDefaultImage(this.props.data) + "')"}}/>
                <div className="lh-content">
                    <span className="category">{uCaseFirst(this.props.data.provider)}</span>
                    <a
                        onClick={this.props.saveItemCallback.bind(
                            this,
                            this.props.data.provider,
                            this.props.searchCategory,
                            this.props.data.item_id,
                            this.props.user[SESSION_USER_ID]
                        )}

                        className={"bookmark" + (this.props.data.saved_item ? " saved" : "")}
                    >
                        <span className="icon-heart"></span>
                    </a>
                    <h3>
                        <a href="#"
                           onClick={this.props.showInfoCallback.bind(
                               this,
                               this.props.data,
                               this.props.searchCategory)}
                        >
                            {this.props.data.item_name}
                        </a>
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
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.session[SESSION_USER],
    };
}

export default connect(
    mapStateToProps,
    null
)(EventItemCompact);