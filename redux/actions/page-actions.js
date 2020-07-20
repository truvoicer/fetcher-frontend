import store from "../store/index"
import { setPageData, setPageError } from "../reducers/page-reducer"
import { setListingsData, setListingsDataProviders, setListingsError} from "../reducers/listings-reducer"
import React from "react";
import {isSet} from "../../library/utils";
import {getProviders} from "./listings-actions";

export function getPageData(url) {
    return function(dispatch) {
        // notify about fetch start
        dispatch({ type: "FETCH_USERS_REQUEST" });

        return fetch(url)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(json => {
                store.dispatch(setPageData(json))
                if (json.listings_block_data !== null) {
                    store.dispatch(setListingsData(json.listings_block_data))
                    if (isSet(json.listings_block_data.tru_fetcher_listings) &&
                        isSet(json.listings_block_data.tru_fetcher_listings.listing_block_category)
                    ) {
                        const category = json.listings_block_data.tru_fetcher_listings.listing_block_category
                        getProviders(category)
                    }
                }
            })
            .catch(error => {
                console.error(error)
                store.dispatch(setPageError(error.message))
            });
    };
}