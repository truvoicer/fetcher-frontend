import {wpApiConfig} from "../../../config/wp-api-config";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getSidebarData} from "../../../redux/middleware/sidebar-middleware"
import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import {SIDEBAR_REQUEST} from "../../../redux/constants/sidebar-constants";
import RightSidebarData from "./RightSidebarData";

const RightSidebar = (props) => {
    useEffect(() => {
        props.getSidebarData(buildWpApiUrl(wpApiConfig.endpoints.sidebar), SIDEBAR_REQUEST)
    })

    return (
        <RightSidebarData />
    )
}

export default connect(
    null,
    {getSidebarData}
)(RightSidebar);