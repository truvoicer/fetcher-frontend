import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";
import {buildFetcherApiUrl, fetchData, fetchSearchData} from "../../../library/api/fetcher/middleware";
import {getToken, isAuthenticated, setSession} from "../../../library/api/fetcher/session/authenticate";
import {isSet} from "../../../library/utils";


class ListingsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        }
        this.getSearchData = this.getSearchData.bind(this)
        this.runSearch = this.runSearch.bind(this)
        this.buildListItems = this.buildListItems.bind(this)
    }

    getSearchData(queryData) {
        queryData.limit = 10;
        queryData.location = "london";
        let getSearchData = fetchSearchData(queryData);
        // console.log(getSearchData);
        if (getSearchData) {
            getSearchData.then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error.message);
                // console.log(error.response.data);
            });
        }
    }

    runSearch() {
        if(!isSet(this.context.listingsData) ||
            !isSet(this.context.listingsData.listing_block_category) ||
            !isSet(this.context.listingsQueryData["keywords"])) {
            return <p>Loading...</p>
        }
        let queryData = this.context.listingsQueryData;
        console.log(queryData)
        if (!isSet(queryData.providers) || queryData.providers.length === 0) {
            this.context.listingsData.providers.map((provider, index) => {
                queryData.provider = provider.provider_name;
                this.getSearchData(queryData);
            });
        } else {
            this.getSearchData(queryData);
        }

        return null
    }



    buildListItems() {
        if (!isAuthenticated()) {
            getToken().then((response) => {
                setSession(response.data)
                this.runSearch()
            })
        }
        const data = this.runSearch();
        return null
    }

    render() {
        return (
            <div>
                <this.buildListItems/>
            </div>
        )
    }
}
ListingsBlock.contextType = ListingsContext;
export default ListingsBlock;