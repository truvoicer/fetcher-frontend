import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {setUserAccountMenuMiddleware} from "../../../redux/middleware/page-middleware";
import UserAccountBlock from "./UserAccountBlock";
import {getSavedItemsListByUserMiddleware} from "../../../redux/middleware/session-middleware";
import {SESSION_AUTHENTICATED} from "../../../redux/constants/session-constants";
import TabLayout from "../Tabs/TabLayout";
import Login from "../../Pages/login";

const UserAccount = (props) => {
    useEffect(() => {
        props.setUserAccountMenuMiddleware()
    })

    return (
        <>
            {props.session[SESSION_AUTHENTICATED] &&
            <UserAccountBlock/>
            }
            {!props.session[SESSION_AUTHENTICATED] &&
            <Login/>
            }
        </>
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
        setUserAccountMenuMiddleware,

    }
)(UserAccount);