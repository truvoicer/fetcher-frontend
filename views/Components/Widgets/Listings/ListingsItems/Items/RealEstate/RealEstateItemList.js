import React from "react";
import Col from "react-bootstrap/Col";
import {SESSION_USER} from "../../../../../../../redux/constants/session-constants";
import {connect} from "react-redux";
import Link from "next/link";
import {getItemViewUrl} from "../../../../../../../redux/actions/search-actions";

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
                        <Link
                            href={getItemViewUrl(this.props.data, this.props.searchCategory)}
                            as={getItemViewUrl(this.props.data, this.props.searchCategory)}
                        >
                            <a>{this.props.data.item_property_type}</a>
                        </Link>
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