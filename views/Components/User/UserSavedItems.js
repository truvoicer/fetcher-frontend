import React, {Component} from 'react';
import {connect} from "react-redux";
import {getMenuMiddleware} from "../../../redux/middleware/page-middleware";

class UserSavedItems extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="user-account-area user-account-details bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 mb-5" data-aos="fade">
                            <h2>My Saved Items</h2>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state.page)
    return {
        blockData: state.page.blocksData,
        session: state.session
    };
}

export default connect(
    mapStateToProps,
    null
)(UserSavedItems);
