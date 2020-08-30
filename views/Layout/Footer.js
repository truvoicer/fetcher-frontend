import {connect} from "react-redux";
import {getSidebarData} from "../../redux/middleware/sidebar-middleware";
import {buildWpApiUrl} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";
import {FOOTER_REQUEST} from "../../redux/constants/sidebar-constants";
import React, {useEffect} from "react";
import FooterData from "./FooterData";

const Footer = (props) => {
    useEffect(() => {
        props.getSidebarData(buildWpApiUrl(wpApiConfig.endpoints.footer), FOOTER_REQUEST);
    });
    return (
        <FooterData/>
    )
}

export default connect(
    null,
    {getSidebarData}
)(Footer);