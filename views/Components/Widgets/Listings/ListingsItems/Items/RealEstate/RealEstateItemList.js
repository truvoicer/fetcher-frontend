import React from "react";
import Col from "react-bootstrap/Col";
import {SESSION_USER} from "../../../../../../../redux/constants/session-constants";
import {connect} from "react-redux";

class RealEstateItemList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={"listings-block--item listings-block--item--grid-list"}>
                <div className={"listings-block--item--grid-list--column"}>
                    <div className={"listings-block--item--image"}>
                        <a href="#" className="image">
                            <img className={"default-image"} src={this.props.data.item_image_url}/>
                        </a>
                    </div>
                </div>
                <div className={"listings-block--item--grid-list--column"}>
                    <h3 className={"listings-block--item--title"}>
                        <a href="#"
                           onClick={this.props.showInfoCallback.bind(
                               this,
                               this.props.data,
                               this.props.searchCategory)}
                        >
                            {this.props.data.item_title}
                        </a>
                    </h3>
                </div>
                <div className={"listings-block--item--grid-list--column"}>
                    <div className={"listings-block--item--price"}>
                        <span>{this.props.data.item_currency}</span>
                        <span>{this.props.data.item_price}</span>
                    </div>
                </div>
                <div className={"listings-block--item--grid-list--column"}>
                    <div className={"listings-block--item--actions"}>
                        <a className="button"
                           onClick={this.props.showInfoCallback.bind(this, this.props.data, this.props.searchCategory)}>More</a>
                    </div>
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
)(RealEstateItemList);