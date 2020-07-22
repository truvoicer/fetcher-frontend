import SidebarComponent from "./layout/SidebarComponent";
import PageComponent from "./Components/Page";
import {ListingsContext} from "./Context/ListingsContext";
import {PageContext} from "./Context/PageContext";
import {SiteContext} from "./Context/SiteContext";
import {fetchWpData, fetchWpSiteData} from "../library/api/wp/middleware";
import {AddAxiosInterceptors} from "../library/api/global-scripts"
import {fetchData, isEmpty, responseHandler} from "../library/api/fetcher/middleware";
import {isSet} from "../library/utils";
import React from "react";

class FetcherApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AddAxiosInterceptors();
    }

    // initialSearch() {
    //     if (!isSet(this.state.listings.listingsData)) {
    //         return false;
    //     }
    //     if (!isSet(this.state.listings.listingsData.initial_search)) {
    //         return false;
    //     }
    //     let initialSearch = this.state.listings.listingsData.initial_search;
    //     if (!isSet(initialSearch.search_type || !isSet(initialSearch.search_value))) {
    //         return false;
    //     }
    //     // console.log(initialSearch)
    //     let queryData = {};
    //     if (initialSearch.search_type === "query") {
    //         queryData.query = initialSearch.search_value;
    //     } else if (initialSearch.search_type === "location") {
    //         queryData.location = initialSearch.search_value;
    //     }
    //     console.log(queryData)
    //     this.setListingsQueryData(queryData)
    // }
    //

    render() {
        return (

            <div id="wrapper">
                <SidebarComponent/>
                <div id="main">
                    {this.props.data.pageName !== "" &&
                    <PageComponent data={this.props.data}/>
                    }
                </div>
            </div>
        )
    }
}

export default FetcherApp;