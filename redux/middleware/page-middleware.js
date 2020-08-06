import store from "../store/index"
import { setPageData, setBlocksData, setPageError } from "../reducers/page-reducer"
import { setListingsData } from "../reducers/listings-reducer"
import React from "react";
import {isSet} from "../../library/utils";
import {getListingsProviders} from "./listings-middleware";

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
                dispatch(setPageData(json))
                if (json.blocks_data !== null) {
                    dispatch(setBlocksData(json.blocks_data))
                    dispatch(setListingsData(json.blocks_data.tru_fetcher_listings))
                    if (isSet(json.blocks_data.tru_fetcher_listings) &&
                        isSet(json.blocks_data.tru_fetcher_listings.listing_block_category)
                    ) {
                        const category = json.blocks_data.tru_fetcher_listings.listing_block_category
                        getListingsProviders(category)
                    }
                }
            })
            .catch(error => {
                console.error(error)
                dispatch(setPageError(error.message))
            });
    };
}