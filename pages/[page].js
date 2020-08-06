import React from "react";
import FetcherApp from "../views/App";
import Router from "next/router";
import {connect, Provider} from "react-redux";
import store from "../redux/store/index";
import {getPageData} from "../redux/middleware/page-middleware";
import {buildWpApiUrl} from "../library/api/wp/middleware";
import {wpApiConfig} from "../config/wp-api-config";

class Page extends React.Component {
    static async getInitialProps(ctx) {
        return {
            props: {}
        }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {page} = Router.query;
        this.props.getPageData(buildWpApiUrl(wpApiConfig.endpoints.page, page));

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
)(Page);