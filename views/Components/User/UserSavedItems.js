import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {connect} from "react-redux";
import {getSavedItemsListByUserMiddleware} from "../../../redux/middleware/session-middleware";
import {isObjectEmpty, isSet, uCaseFirst} from "../../../library/utils";
import {SESSION_USER, SESSION_USER_ID} from "../../../redux/constants/session-constants";
import SavedItemsVerticalTabs from "../Tabs/SavedItemsVerticalTabs";

const UserSavedItems = (props) => {
    const [tabData, setTabData] = useState({});
    useLayoutEffect(() => {
        const getSavedItemsByUserCallback = (error, data) => {
            if (!error) {
                setTabData(buildSavedItemsList(data.data))
            }
        }
        props.getSavedItemsListByUserMiddleware(
            {"user_id": props.session[SESSION_USER][SESSION_USER_ID]},
            getSavedItemsByUserCallback
        )
    }, [])

    const buildSavedItemsList = (data) => {
        let tabData = {};
        data.map((savedItem) => {
            if (!isSet(tabData[savedItem.provider_name])) {
                tabData[savedItem.provider_name] = {}
                tabData[savedItem.provider_name].items = [];
            }
            tabData[savedItem.provider_name].category = savedItem.category;
            tabData[savedItem.provider_name].name = savedItem.provider_name;
            tabData[savedItem.provider_name].label = uCaseFirst(savedItem.provider_name);
            tabData[savedItem.provider_name].items.push(savedItem);
            tabData[savedItem.provider_name].items_response = [];
        })
        return tabData
    }

    return (
        <div className="user-account-area user-account-details bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 mb-5" data-aos="fade">
                        <h2>My Saved Items</h2>
                        {!isObjectEmpty(tabData) &&
                        <SavedItemsVerticalTabs data={tabData}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    // console.log(state.page)
    return {
        session: state.session,
    };
}

export default connect(
    mapStateToProps,
    {
        getSavedItemsListByUserMiddleware
    }
)(UserSavedItems);
