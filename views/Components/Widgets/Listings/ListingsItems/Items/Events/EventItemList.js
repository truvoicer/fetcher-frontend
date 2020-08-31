import React from "react";
import {formatDate, getDefaultImage, uCaseFirst} from "../../../../../../../library/utils";
import {SESSION_USER, SESSION_USER_ID} from "../../../../../../../redux/constants/session-constants";
import {connect} from "react-redux";
import Link from "next/link";
import {getItemViewUrl} from "../../../../../../../redux/actions/search-actions";

const EventItemList = (props) => {
    
    return (
        <div className="d-block d-md-flex listing">
            <a href="#" className="img d-block"
               style={{backgroundImage: "url('" + getDefaultImage(props.data) + "')"}}/>
            <div className="lh-content">
                <span className="category">{uCaseFirst(props.data.provider)}</span>
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
                        <a>{props.data.item_name}</a>
                    </Link>
                </h3>
                <p>{props.data.item_venue}</p>
                <p>{formatDate(props.data.item_start_date)}</p>
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

function mapStateToProps(state) {
    return {
        user: state.session[SESSION_USER],
    };
}

export default connect(
    mapStateToProps,
    null
)(EventItemList);