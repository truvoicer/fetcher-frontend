import React, {Component} from 'react';
import {isSet} from "../../../../../library/utils";
import LoaderComponent from "../../../../../views/Components/Widgets/Loader";
import {buildWpApiUrl} from "../../../../../library/api/wp/middleware";
import {wpApiConfig} from "../../../../../config/wp-api-config";
import FetcherApp from "../../../../../views/App";
import {connect} from "react-redux";
import {
    getItemMiddleware,
    setItemCategoryMiddleWare,
    setItemIdMiddleWare,
    setItemProviderMiddleware
} from "../../../../../redux/middleware/item-middleware";
import {getPageDataMiddleware} from "../../../../../redux/middleware/page-middleware";
import {fetcherApiConfig} from "../../../../../config/fetcher-api-config";

const ProviderItemPage = (props) => {
    if (!isSet(props.category)) {
        return <LoaderComponent/>
    }
    let data = {
        [fetcherApiConfig.queryKey]: props.item_id,
        provider: props.provider
    }
    props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.template, props.category));
    props.setItemProviderMiddleware(props.provider)
    props.setItemCategoryMiddleWare(props.category)
    props.setItemIdMiddleWare(props.item_id)
    props.getItemMiddleware(data);
    return (
        <FetcherApp />
    )
}

export default connect(
    null,
    {
        getItemMiddleware,
        setItemIdMiddleWare,
        setItemCategoryMiddleWare,
        setItemProviderMiddleware,
        getPageDataMiddleware
    }
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