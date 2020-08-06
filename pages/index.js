import React from "react";
import FetcherApp from "../views/App";
import { render } from "react-dom";
import {connect, Provider} from "react-redux";
import store from "../redux/store/index";
import Router from "next/router";
import {buildWpApiUrl} from "../library/api/wp/middleware";
import {wpApiConfig} from "../config/wp-api-config";
import {getPageData} from "../redux/middleware/page-middleware";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPageData(buildWpApiUrl(wpApiConfig.endpoints.page, "home"));

    }

    render() {
        return (
            <FetcherApp />
        )
    }
}
export default connect(
    null,
    {getPageData}
)(Home);