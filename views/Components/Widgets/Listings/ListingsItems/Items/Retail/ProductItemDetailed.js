import React from "react";
import {SESSION_USER} from "../../../../../../../redux/constants/session-constants";
import {connect} from "react-redux";
import Link from "next/link";
import {getItemViewUrl} from "../../../../../../../redux/actions/search-actions";


const ProductItemDetailed = (props) => {
    return (
        <div className={"listings-block--item listings-block--item--grid-detailed"}>
            <div className={"listings-block--item--image"}>
                <a href="#" className="image">
                    <img className={"default-image"} src={props.data.item_image_url}/>
                </a>
            </div>
            <h3 className={"listings-block--item--title"}>
                <Link
                    href={getItemViewUrl(props.data, props.searchCategory)}
                    as={getItemViewUrl(props.data, props.searchCategory)}
                >
                    <a>{props.data.item_title}</a>
                </Link>
            </h3>
            <div className={"listings-block--item--actions"}>
                <a className="button"
                   onClick={props.showInfoCallback.bind(props.data, props.searchCategory)}>More</a>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.session[SESSION_USER],
    };
}

export default connect(
    mapStateToProps,
    null
)(ProductItemDetailed);