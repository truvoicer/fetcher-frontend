import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import {wpApiConfig} from "../../../config/wp-api-config";
import {connect} from "react-redux";
import {getSidebarData} from "../../../redux/middleware/sidebar-middleware";
import React, {useEffect} from "react";
import {TOPBAR_REQUEST} from "../../../redux/constants/sidebar-constants";
import TopBarData from "./TopBarData";

const TopBar = (props) => {
    useEffect(() => {
        props.getSidebarData(buildWpApiUrl(wpApiConfig.endpoints.topBar), TOPBAR_REQUEST)
    })

    return (
        <TopBarData />
    )
}
export default connect(
    null,
    {getSidebarData}
)(TopBar);