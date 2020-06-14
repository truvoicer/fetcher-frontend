import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";
import {buildFetcherApiUrl, fetchData, fetchSearchData} from "../../../library/api/fetcher/middleware";
import {getToken, isAuthenticated, setSession} from "../../../library/api/fetcher/session/authenticate";


class ListingsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this)
        this.buildListItems = this.buildListItems.bind(this)
    }

    getData() {
        // if(typeof this.context.listingsData === "undefined" ||
        //     typeof this.context.listingsData.listing_block_category === "undefined" ||
        //     typeof this.context.listingsQueryData["keywords"] === "undefined") {
        //     return <p>Loading...</p>
        // }
        console.log(this.context)
        let queryData = this.context.listingsQueryData;
        // let getSearchData = fetchSearchData(queryData);
        // if (!getSearchData) {
        //     return <p>Loading...</p>
        // }
        // getSearchData.then((response) => {
        //     console.log(response)
        // })

        return null
    }

    buildListItems() {
        if (!isAuthenticated()) {
            getToken().then((response) => {
                setSession(response.data)
                this.getData()
            })
        }
        const data = this.getData();
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