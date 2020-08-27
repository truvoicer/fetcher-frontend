import React from "react";
import FetcherApp from "../views/App";
import Router from "next/router";
import {connect, Provider} from "react-redux";
import store from "../redux/store/index";
import {getPageDataMiddleware} from "../redux/middleware/page-middleware";
import {buildWpApiUrl} from "../library/api/wp/middleware";
import {wpApiConfig} from "../config/wp-api-config";
import {isSet} from "../library/utils";
import LoaderComponent from "../views/Components/Widgets/Loader";

class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!isSet(this.props.page)) {
            return <LoaderComponent/>
        }
        let page = this.props.page;
        if (Array.isArray(this.props.page)) {
            page = this.props.page.join("/");
        }
        this.props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.page), {page: page});
        return (
                <FetcherApp />
        )
    }
}

export default connect(
    null,
    {getPageDataMiddleware}
)(Page);

export async function getStaticProps({ params }) {
    return {
        props: {
            page: params.page
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true // See the "fallback" section below
    };
}