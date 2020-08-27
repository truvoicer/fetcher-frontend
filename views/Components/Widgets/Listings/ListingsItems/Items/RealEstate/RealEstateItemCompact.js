import React from "react";
import Col from "react-bootstrap/Col";
import {SESSION_USER, SESSION_USER_ID} from "../../../../../../../redux/constants/session-constants";
import {connect} from "react-redux";

class RealEstateItemCompact extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        // console.log(this.props.data)
        return (
            <div className="d-block d-md-flex listing vertical">
                <a href="#" className="img d-block"
                   style={{backgroundImage: "url('" + this.props.data.item_default_image + "')"}}/>
                <div className="lh-content">
                    <span className="category">{this.props.data.item_property_type}</span>
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
                            {this.props.data.item_property_type}
                        </a>
                    </h3>
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
)(RealEstateItemCompact);