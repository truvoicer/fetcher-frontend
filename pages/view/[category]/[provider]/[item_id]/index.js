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
import {getPageData} from "../../../../../redux/middleware/page-middleware";

class ProviderItemPage extends Component {
    static async getInitialProps(ctx) {
        return {
            props: {}
        }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {category, provider, item_id} = Router.query
        this.props.getPageData(buildWpApiUrl(wpApiConfig.endpoints.template, category));
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
)(ProviderItemPage);
