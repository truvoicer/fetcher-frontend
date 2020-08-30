import React, {useEffect} from "react";
import FetcherApp from "../views/App";
import {connect} from "react-redux";
import {buildWpApiUrl} from "../library/api/wp/middleware";
import {wpApiConfig} from "../config/wp-api-config";
import {getPageDataMiddleware} from "../redux/middleware/page-middleware";

const Home = (props) => {
    useEffect(() => {
        props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.page), {page: "home"});
    })
    return (
        <FetcherApp />
    )
}

export default connect(
    null,
    {
        getPageDataMiddleware
    }
)(Home);