import React from "react";
import {SESSION_USER, SESSION_USER_ID} from "../../../../../../../redux/constants/session-constants";
import {connect} from "react-redux";
import Link from "next/link";
import {getItemViewUrl} from "../../../../../../../redux/actions/search-actions";

const RealEstateItemCompact = (props) => {

    // console.log(props.data)
    return (
        <div className="d-block d-md-flex listing vertical">
            <a href="#" className="img d-block"
               style={{backgroundImage: "url('" + props.data.item_default_image + "')"}}/>
            <div className="lh-content">
                <span className="category">{props.data.item_property_type}</span>
                <a
                    onClick={props.saveItemCallback.bind(
                        this,
                        props.data.provider,
                        props.searchCategory,
                        props.data.item_id,
                        props.user[SESSION_USER_ID]
                    )}

                    className={"bookmark" + (props.data.saved_item ? " saved" : "")}
                >
                    <span className="icon-heart"/>
                </a>
                <h3>
                    <Link
                        href={getItemViewUrl(props.data, props.searchCategory)}
                        as={getItemViewUrl(props.data, props.searchCategory)}
                    >
                        <a>{props.data.item_property_type}</a>
                    </Link>
                </h3>
                <p>{props.data.item_summary}</p>
                <p className="mb-0">
                    <span className="icon-star text-warning"/>
                    <span className="icon-star text-warning"/>
                    <span className="icon-star text-warning"/>
                    <span className="icon-star text-warning"/>
                    <span className="icon-star text-secondary"/>
                    <span className="review">(3 Reviews)</span>
                </p>
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
)(RealEstateItemCompact);