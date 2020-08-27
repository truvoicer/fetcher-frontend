import React, {Component} from 'react';
import Router from "next/router";
import {fetchData} from "../../../../../library/api/fetcher/middleware";
import {siteConfig} from "../../../../../config/site-config";
import {isSet} from "../../../../../library/utils";
import LoaderComponent from "../../../../../views/Components/Widgets/Loader";
import {buildWpApiUrl} from "../../../../../library/api/wp/middleware";
import {wpApiConfig} from "../../../../../config/wp-api-config";
import FetcherApp from "../../../../../views/App";
import {connect} from "react-redux";
import {getPageDataMiddleware} from "../../../../../redux/middleware/page-middleware";

class ProviderItemPage extends Component {

    render() {
        if (!isSet(this.props.category)) {
            return <LoaderComponent/>
        }
        this.props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.template, this.props.category));
        return (
            <FetcherApp />
        )
    }
}

export default connect(
    null,
    {getPageDataMiddleware}
)(ProviderItemPage);

export async function getStaticProps({ params }) {
    return {
        props: {
            category: params.category,
            provider: params.provider,
            item_id: params.item_id,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true // See the "fallback" section below
    };
}