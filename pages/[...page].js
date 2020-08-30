import React, {useEffect} from "react";
import FetcherApp from "../views/App";
import {connect} from "react-redux";
import {getPageDataMiddleware} from "../redux/middleware/page-middleware";
import {buildWpApiUrl} from "../library/api/wp/middleware";
import {wpApiConfig} from "../config/wp-api-config";
import {isSet} from "../library/utils";
import LoaderComponent from "../views/Components/Widgets/Loader";

const Page = (props) => {
    if (!isSet(props.page)) {
        return <LoaderComponent/>
    }
    let page = props.page;
    if (Array.isArray(props.page)) {
        page = props.page.join("/");
    }
    useEffect(() => {
        props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.page), {page: page});
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