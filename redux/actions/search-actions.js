import React from "react";
import store from "../store/index";
import {fetchData, fetchSearchData, validateRequestParams} from "../../library/api/fetcher/middleware";
import {fetcherApiConfig} from "../../config/fetcher-api-config";
import {
    setSearchStatus,
    setSearchOperation,
    setRequestService,
    setSearchList,
    setHasMoreResults,
    setExtraData,
    setProvider,
    setCategory,
    setSearchError,
} from "../reducers/search-reducer"
import {isEmpty, isSet} from "../../library/utils";
import {setListingsQueryData} from "../reducers/listings-reducer";
import produce from "immer";
import {addArrayItem, addListingsQueryDataString} from "../middleware/listings-middleware";
import {addQueryDataObjectAction, addQueryDataString} from "./listings-actions";
import {
    SEARCH_REQUEST_COMPLETED,
    SEARCH_REQUEST_ERROR,
    SEARCH_REQUEST_IDLE,
    SEARCH_REQUEST_STARTED,
    APPEND_SEARCH_REQUEST,
    NEW_SEARCH_REQUEST, SEARCH_RESET
} from "../constants/search-constants";

export function setSearchExtraDataAction(extraData) {
    const extraDataState = {...store.getState().search.extraData};
    const object = Object.assign({}, extraDataState, extraData);
    store.dispatch(setExtraData(object))
}

export function setSearchListDataAction(listData) {
    const searchState = {...store.getState().search};
    if (listData.length === 0) {
        return
    }
    const searchOperation = searchState.searchOperation;
    const searchStatus = searchState.searchStatus;

    const nextState = produce(searchState.searchList, (draftState) => {
        if ((searchOperation === NEW_SEARCH_REQUEST)) {
            console.log(searchOperation)
            store.dispatch(setSearchOperation(APPEND_SEARCH_REQUEST));
            draftState.splice(0, draftState.length + 1);

        } else if (searchOperation === APPEND_SEARCH_REQUEST) {
            console.log("append")
        }
        listData.map((item) => {
            draftState.push(item)
        })
    })
    console.log(nextState)
    store.dispatch(setSearchList(nextState))
}

export function setSearchProviderAction(provider) {
    store.dispatch(setProvider(provider))
}

export function setSearchCategoryAction(category) {
    store.dispatch(setCategory(category))
}

export function setSearchRequestServiceAction(requestService) {
    store.dispatch(setRequestService(requestService))
}

export function setSearchRequestStatusAction(status) {
    store.dispatch(setSearchStatus(status))
}
export function setSearchRequestOperationAction(operation) {
        store.dispatch(setSearchOperation(operation))
}

export function setSearchHasMoreResultsAction(hasMoreResults) {
    store.dispatch(setHasMoreResults(hasMoreResults))
}

export function setSearchRequestErrorAction(error) {
    store.dispatch(setSearchError(error))
}

export function searchResponseHandler(status, data, completed = false) {
    // console.log(status, data)
    if (status === 200) {
        setSearchListDataAction(data.requestData);
        setSearchExtraDataAction(data.extraData)
        setSearchRequestServiceAction(data.requestService)
        setSearchProviderAction(data.provider)
        setSearchCategoryAction(data.category)

        if (isSet(data.extraData.page_offset) && isSet(data.extraData.page_size)) {
            if (parseInt(data.extraData.page_offset) < parseInt(data.extraData.total_items)) {
                setSearchHasMoreResultsAction(true);
            }
        } else if (isSet(data.extraData.page_number)) {
            if (parseInt(data.extraData.page_number) < parseInt(data.extraData.page_count)) {
                setSearchHasMoreResultsAction(true);
            }
        }
    } else {
        setSearchRequestStatusAction(SEARCH_REQUEST_ERROR);
        setSearchRequestErrorAction(data.message)
    }
    if (completed) {
        setSearchRequestStatusAction(SEARCH_REQUEST_COMPLETED);
    }
}

function validateSearchParams() {
    const listingsDataState = store.getState().listings.listingsData;
    const queryDataState = store.getState().listings.listingsQueryData;
    if (!isSet(listingsDataState.listing_block_category)) {
        setSearchRequestErrorAction("No category found...")
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
        setSearchRequestErrorAction("Empty search query...")
        return false;
        // store.dispatch(addListingsQueryDataString(fetcherApiConfig.queryKey, ""));
    }
    if (!isSet(queryDataState[fetcherApiConfig.searchLimitKey])) {
        addListingsQueryDataString(fetcherApiConfig.searchLimitKey, fetcherApiConfig.defaultSearchLimit);
    }
    return true;
}

function getEndpointOperation() {
    const listingsDataState = store.getState().listings.listingsData;
    if (isSet(listingsDataState.service_endpoint) && listingsDataState.service_endpoint !== "") {
        return listingsDataState.service_endpoint;
    }
    return fetcherApiConfig.defaultOperation
}

export const runSearch = () => {
    setSearchRequestStatusAction(SEARCH_REQUEST_STARTED);
    const listingsDataState = store.getState().listings.listingsData;
    const queryDataState = store.getState().listings.listingsQueryData;
    if (!validateSearchParams()) {
        setSearchRequestStatusAction(SEARCH_REQUEST_ERROR);
        return false;
    }

    let queryData = {...queryDataState};
    if (!isSet(queryDataState.providers) || queryDataState.providers.length === 0) {
        let providers = [];
        queryData["limit"] = calculateLimit(queryData["limit"], listingsDataState.providers.length);
        listingsDataState.providers.map((provider, index) => {
            providers.push(provider.provider_name)
            queryData["provider"] = provider.provider_name;
            fetchData("operation", [getEndpointOperation()], queryData, searchResponseHandler, (listingsDataState.providers.length === index + 1))
        });
        providers.map((provider) => {
            addArrayItem("providers", provider)
        })
    } else {
        queryData["limit"] = calculateLimit(queryData["limit"], queryDataState.providers.length);
        queryDataState.providers.map((provider, index) => {
            queryData["provider"] = provider;
            fetchData("operation", [getEndpointOperation()], queryData, searchResponseHandler, (queryDataState.providers.length === index + 1))
        });
    }

}

function calculateLimit(limit, providerCount) {
    return Math.floor(limit / providerCount);
}

export function initialSearch() {
    store.dispatch(setSearchOperation(NEW_SEARCH_REQUEST));
    const listingsDataState = store.getState().listings.listingsData;
    if (isEmpty(listingsDataState)) {
        setSearchError("Listings data empty on initial search...")
        return false;
    }
    if (!isSet(listingsDataState.initial_search)) {
        setSearchError("Initial search data is not set on initial search...")
        return false;
    }
    let initialSearch = listingsDataState.initial_search;
    if (!isSet(initialSearch.search_type || !isSet(initialSearch.search_value))) {
        setSearchError("Initial search type or value not set...")
        return false;
    }
    let queryData = {};
    queryData[fetcherApiConfig.searchLimitKey] = fetcherApiConfig.defaultSearchLimit;
    if (initialSearch.search_type === "query") {
        queryData[fetcherApiConfig.queryKey] = initialSearch.search_value
    } else if (initialSearch.search_type === "location") {
        queryData.location = initialSearch.search_value
    }
    addQueryDataObjectAction(queryData, true);
}
