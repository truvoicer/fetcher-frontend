import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSavedItemsListByUserMiddleware} from "../../../redux/middleware/session-middleware";
import {isObjectEmpty, isSet, uCaseFirst} from "../../../library/utils";
import {SESSION_USER, SESSION_USER_ID} from "../../../redux/constants/session-constants";
import SavedItemsVerticalTabs from "../Tabs/SavedItemsVerticalTabs";

class UserSavedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabData: {}
        }
        this.buildSavedItemsList = this.buildSavedItemsList.bind(this)
        this.getSavedItemsByUser = this.getSavedItemsByUser.bind(this)
        this.getSavedItemsByUserCallback = this.getSavedItemsByUserCallback.bind(this)
    }

    componentDidMount() {
        this.getSavedItemsByUser();
    }

    getSavedItemsByUser() {
        this.props.getSavedItemsListByUserMiddleware(
            {"user_id": this.props.session[SESSION_USER][SESSION_USER_ID]},
            this.getSavedItemsByUserCallback
        )
    }

    getSavedItemsByUserCallback(error, data) {
        console.log(error, data)
        if (!error) {
            this.setState({
                tabData: this.buildSavedItemsList(data.data)
            })
        }
    }

    buildSavedItemsList(data) {
        let tabData = {};
        data.map((savedItem) => {
            if (!isSet(tabData[savedItem.provider_name])) {
                tabData[savedItem.provider_name] = {}
                tabData[savedItem.provider_name].items = [];
            }
            tabData[savedItem.provider_name].label = uCaseFirst(savedItem.provider_name);
            tabData[savedItem.provider_name].items.push(savedItem)
        })
        return tabData
    }

    render() {
        return (
            <div className="user-account-area user-account-details bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 mb-5" data-aos="fade">
                            <h2>My Saved Items</h2>
                            {!isObjectEmpty(this.state.tabData) &&
                            <SavedItemsVerticalTabs data={this.state.tabData}/>
                            }
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
        session: state.session,
        search: state.search
    };
}

export default connect(
    mapStateToProps,
    {getSavedItemsListByUserMiddleware}
)(UserSavedItems);
