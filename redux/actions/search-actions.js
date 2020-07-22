import React from "react";
import store from "../store/index";
import {fetchData, fetchSearchData, validateRequestParams} from "../../library/api/fetcher/middleware";
import {fetcherApiConfig} from "../../config/fetcher-api-config";
import {
    setRequestStatus,
    setRequestService,
    setSearchList,
    setExtraData,
    setProvider,
    setCategory,
    setSearchError,
} from "../reducers/search-reducer"
import {isSet} from "../../library/utils";
import {setListingsQueryData} from "../reducers/listings-reducer";
import produce from "immer";
import {addArrayItem, addListingsQueryDataString} from "./listings-actions";
import {
    SEARCH_REQUEST_COMPLETED,
    SEARCH_REQUEST_ERROR,
    SEARCH_REQUEST_IDLE,
    SEARCH_REQUEST_STARTED
} from "../constants/search";

export function setSearchExtraData(extraData) {
    const extraDataState = {...store.getState().search.extraData};
    const object = Object.assign({}, extraDataState, extraData);
    store.dispatch(setExtraData(object))
}

export function setSearchListData(listData) {
    const searchState = {...store.getState().search};
    if (listData.length === 0) {
        return
    }
    const nextState = produce(searchState.searchList, (draftState) => {
        listData.map((item) => {
            draftState.push(item)
        })
    })
    store.dispatch(setSearchList(nextState))
}

export function setSearchProvider(provider) {
    store.dispatch(setProvider(provider))
}

export function setSearchCategory(category) {
    store.dispatch(setCategory(category))
}

export function setSearchRequestService(requestService) {
    store.dispatch(setRequestService(requestService))
}

export function setSearchRequestStatus(status) {
    store.dispatch(setRequestStatus(status))
}

export function setSearchRequestError(error) {
    store.dispatch(setSearchError(error))
}

export function searchResponseHandler(status, data, completed = false) {
    // console.log(status, data)
    if (status === 200) {
        setSearchListData(data.requestData);
        setSearchExtraData(data.extraData)
        setSearchRequestService(data.requestService)
        setSearchProvider(data.provider)
        setSearchCategory(data.category)
    } else {
        setSearchRequestStatus(SEARCH_REQUEST_ERROR);
        setSearchRequestError(data.message)
    }
    if (completed) {
        setSearchRequestStatus(SEARCH_REQUEST_COMPLETED);
    }
}

function validateSearchParams() {
    const listingsDataState = store.getState().listings.listingsData;
    const queryDataState = store.getState().listings.listingsQueryData;
    if (!isSet(listingsDataState.listing_block_category)) {
        setSearchRequestError("No category found...")
        return false;
    }
    // const validateSearchQuery = validateRequestParams([fetcherApiConfig.queryKey], queryDataState);
    // if (!validateSearchQuery) {
    //     store.dispatch(setSearchError("Search parameters are empty..."))
    //     return false;
    // }
    // if (Array.isArray(validateSearchQuery) && validateSearchQuery.length > 0) {
    //     store.dispatch(setSearchError(validateSearchQuery.map(value => value).join(", ") + " Field errors..."));
    //     return false;
    // }
    if (!isSet(queryDataState[fetcherApiConfig.queryKey]) || queryDataState[fetcherApiConfig.queryKey] === "") {
        setSearchRequestError("Empty search query...")
        return false;
        // store.dispatch(addListingsQueryDataString(fetcherApiConfig.queryKey, ""));
    }
    if (!isSet(queryDataState[fetcherApiConfig.searchLimitKey])) {
        addListingsQueryDataString(fetcherApiConfig.searchLimitKey, fetcherApiConfig.defaultSearchLimit);
    }
    return true;
}

export const runSearch = () => {
    setSearchRequestStatus(SEARCH_REQUEST_STARTED);
    const listingsDataState = store.getState().listings.listingsData;
    const queryDataState = store.getState().listings.listingsQueryData;
    if (!validateSearchParams()) {
        setSearchRequestStatus(SEARCH_REQUEST_ERROR);
        return false;
    }

    let queryData = {...queryDataState};
    if (!isSet(queryDataState.providers) || queryDataState.providers.length === 0) {
        let providers = [];
        listingsDataState.providers.map((provider, index) => {
            providers.push(provider.provider_name)
            queryData["provider"] = provider.provider_name;
            fetchData("operation", ["list"], queryData, searchResponseHandler, (listingsDataState.providers.length === index + 1))
        });
        providers.map((provider) => {
            addArrayItem("providers", provider)
        })
    } else {
        queryDataState.providers.map((provider, index) => {
            queryData["provider"] = provider;
            fetchData("operation", ["list"], queryData, searchResponseHandler, (queryDataState.providers.length === index + 1))
        });
    }

}