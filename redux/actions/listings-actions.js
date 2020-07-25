import React from "react";
import store from "../store/index";
import {fetchData} from "../../library/api/fetcher/middleware";
import {
    setListingsData,
    setListingsQueryData,
    setListingsDataProviders,
    setListingsError
} from "../reducers/listings-reducer"
import {isSet} from "../../library/utils";
import {initialSearch, runSearch, setSearchRequestOperation} from "./search-actions";
import {NEW_SEARCH_REQUEST} from "../constants/search-constants";

export function addQueryDataString(key, value, search = false) {
    let listingsQueryData = {...store.getState().listings.listingsQueryData}

    const object = Object.assign({}, listingsQueryData, {
        [key]: value
    });
    store.dispatch(setListingsQueryData(object))
    if (search) {
        runSearch();
    }
}