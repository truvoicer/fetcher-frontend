import React from "react";
import Col from "react-bootstrap/Col";
import {SESSION_USER, SESSION_USER_ID} from "../../../../../../../redux/constants/session-constants";
import {connect} from "react-redux";
import Link from "next/link";
import {getItemViewUrl} from "../../../../../../../redux/actions/search-actions";

class ProductItemCompact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: null
        }
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
        // console.log(this.props.data)
        return (
            <div className="d-block d-md-flex listing vertical">
                <a href="#" className="img d-block"
                   style={{backgroundImage: "url('" + this.props.data.item_image_url + "')"}}/>
                <div className="lh-content">
                    <span className="category">Cars &amp; Vehicles</span>
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
                        <Link
                            href={getItemViewUrl(this.props.data, this.props.searchCategory)}
                            as={getItemViewUrl(this.props.data, this.props.searchCategory)}
                        >
                            <a>{this.props.data.item_title}</a>
                        </Link>
                    </h3>
                    {/*<p>{}</p>*/}
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
)(ProductItemCompact);