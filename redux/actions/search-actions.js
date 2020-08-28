import React from "react";
import store from "../store/index";
import {fetchData} from "../../library/api/fetcher/middleware";
import {fetcherApiConfig} from "../../config/fetcher-api-config";
import {
    setCategory,
    setExtraData,
    setProvider,
    setRequestService,
    setSearchError,
    setSearchList,
    setSavedItemsList,
    setSearchOperation,
    setSearchStatus,
    setSearchResults
} from "../reducers/search-reducer"
import {isEmpty, isSet} from "../../library/utils";
import produce from "immer";
import {addArrayItem, addListingsQueryDataString} from "../middleware/listings-middleware";
import {addQueryDataObjectAction} from "./listings-actions";
import {
    APPEND_SEARCH_REQUEST,
    NEW_SEARCH_REQUEST,
    PAGE_CONTROL_CURRENT_PAGE,
    PAGE_CONTROL_PAGE_SIZE,
    PAGE_CONTROL_PAGINATION_REQUEST,
    SEARCH_REQUEST_COMPLETED,
    SEARCH_REQUEST_ERROR,
    SEARCH_REQUEST_STARTED
} from "../constants/search-constants";
import {
    addPaginationQueryParameters,
    setHasMoreSearchPages,
    setPageControlItemAction,
    setPageControlsAction
} from "./pagination-actions";
import {buildWpApiUrl, getSavedItemsList} from "../../library/api/wp/middleware";
import {Routes} from "../../config/routes";
import Router from "next/router";
import {wpApiConfig} from "../../config/wp-api-config";

const axios = require('axios');
const sprintf = require("sprintf").sprintf;

export function setSearchExtraDataAction(extraData, provider) {
    const extraDataState = {...store.getState().search.extraData};

    const nextState = produce(extraDataState, (draftState) => {
        if (!isSet(draftState[provider])) {
            draftState[provider] = {};
        }
        draftState[provider] = extraData;
    })
    store.dispatch(setExtraData(nextState))
}

export function setSearchListDataAction(listData) {
    const searchState = {...store.getState().search};
    if (listData.length === 0) {
        return
    }
    const searchOperation = searchState.searchOperation;

    const nextState = produce(searchState.searchList, (draftState) => {
        if ((searchOperation === NEW_SEARCH_REQUEST)) {
            // console.log(searchOperation)
            store.dispatch(setSearchOperation(APPEND_SEARCH_REQUEST));
            draftState.splice(0, draftState.length + 1);

        } else if (searchOperation === APPEND_SEARCH_REQUEST) {
            // console.log("append")
        }
        listData.map((item) => {
            draftState.push(item)
        })
    })
    store.dispatch(setSearchList(nextState))
}

export function setSavedItemsListAction(data, provider, category) {
    if (data.length === 0) {
        return false;
    }
    const itemsList = data.map((item) => {
        return item.item_id;
    })
    const requestData = {
        provider_name: provider,
        category: category,
        id_list: itemsList
    }
    getSavedItemsList(requestData, getSavedItemsCallback)
}

export function getSavedItemsCallback(error, data) {
    // console.log(error, data)
    if (error) {
        return false;
    }
    const searchState = {...store.getState().search};
    const searchOperation = searchState.searchOperation;
    const nextState = produce(searchState.savedItemsList, (draftState) => {
        if ((searchOperation === NEW_SEARCH_REQUEST)) {
            draftState.splice(0, draftState.length + 1);
        } else if (searchOperation === APPEND_SEARCH_REQUEST) {
            // console.log("append")
        }
        data.data.map((item) => {
            draftState.push(item)
        })
    })
    store.dispatch(setSavedItemsList(nextState))
}

export function updateSavedItemAction(data) {
    const searchState = {...store.getState().search};
    const nextState = produce(searchState.savedItemsList, (draftState) => {
        if (isSavedItemAction(data.item_id, data.provider_name, data.category, data.user_id)) {
            draftState.splice(getSavedItemIndexAction(data.item_id, data.provider_name, data.category, data.user_id), 1);
        } else {
            draftState.push(data)
        }
    })
    store.dispatch(setSavedItemsList(nextState))
}

export function isSavedItemAction(item_id, provider, category, user_id) {
    const savedItemsList = [...store.getState().search.savedItemsList];
    const isSaved = savedItemsList.filter(savedItem => {
        if(
            parseInt(savedItem.user_id) === parseInt(user_id) &&
            savedItem.item_id === item_id &&
            savedItem.provider_name === provider &&
            savedItem.category === category
        ) {
            return savedItem;
        }
    });
    return isSaved.length > 0;
}

export function getSavedItemIndexAction(item_id, provider, category, user_id) {
    let index;
    const savedItemsList = [...store.getState().search.savedItemsList];
    savedItemsList.map((savedItem, savedItemIndex) => {
        if(
            parseInt(savedItem.user_id) === parseInt(user_id) &&
            savedItem.item_id === item_id &&
            savedItem.provider_name === provider &&
            savedItem.category === category
        ) {
            index = savedItemIndex;
        }
    });
    return index;
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

export function setSearchRequestErrorAction(error) {
    store.dispatch(setSearchError(error))
}

export function searchResponseHandler(status, data, completed = false) {
    // console.log(status, data)
    if (status === 200) {
        setSavedItemsListAction(data.request_data, data.provider, data.category)
        setSearchListDataAction(data.request_data);
        setSearchExtraDataAction(data.extra_data, data.provider)
        setSearchRequestServiceAction(data.request_service)
        setSearchProviderAction(data.provider)
        setSearchCategoryAction(data.category)
        setPageControlsAction(data.extra_data)

    } else {
        setSearchRequestStatusAction(SEARCH_REQUEST_ERROR);
        setSearchRequestErrorAction(data.message)
    }
    if (completed) {
        setHasMoreSearchPages()
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
    const pageControlsState = store.getState().search.pageControls;
    if (!validateSearchParams()) {
        setSearchRequestStatusAction(SEARCH_REQUEST_ERROR);
        return false;
    }

    if (!pageControlsState[PAGE_CONTROL_PAGINATION_REQUEST]) {
        setPageControlItemAction(PAGE_CONTROL_CURRENT_PAGE, 1);
    }

    let queryData = {...queryDataState};
    if (!isSet(queryDataState.providers) || queryDataState.providers.length === 0) {
        let providers = [];
        queryData["limit"] = calculateLimit(listingsDataState.providers.length);
        listingsDataState.providers.map((provider, index) => {
            providers.push(provider.provider_name)
            queryData = addPaginationQueryParameters(queryData, provider.provider_name);
            queryData["provider"] = provider.provider_name;
            fetchData("operation", [getEndpointOperation()], queryData, searchResponseHandler, (listingsDataState.providers.length === index + 1))
        });
        providers.map((provider) => {
            addArrayItem("providers", provider)
        })
    } else {
        queryData["limit"] = calculateLimit(queryDataState.providers.length);
        queryDataState.providers.map((provider, index) => {
            queryData = addPaginationQueryParameters(queryData, provider.provider_name);
            queryData["provider"] = provider;
            fetchData("operation", [getEndpointOperation()], queryData, searchResponseHandler, (queryDataState.providers.length === index + 1))
        });
    }

}

function calculateLimit(providerCount) {
    const pageControlsState = {...store.getState().search.pageControls}
    let pageSize = pageControlsState[PAGE_CONTROL_PAGE_SIZE];
    // console.log(pageSize, providerCount, Math.floor(pageSize / providerCount))
    return Math.floor(pageSize / providerCount);
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
    if (!isSet(initialSearch.parameter_name || !isSet(initialSearch.parameter_value))) {
        setSearchError("Initial search parameters are not set...")
        return false;
    }
    let queryData = {};
    queryData[initialSearch.parameter_name] = initialSearch.parameter_value;
    queryData[fetcherApiConfig.pageNumberKey] = 1;
    addQueryDataObjectAction(queryData, true);
}

export function getItemViewUrl(item, category) {
    const data = {
        category: category,
        provider: item.provider,
        item_id: item.item_id
    }
    return sprintf(Routes.itemView, data);
}

export function showInfo(item, category, e) {
    e.preventDefault()

    const data = {
        category: category,
        provider: item.provider,
        item_id: item.item_id
    }
    const url = sprintf(Routes.itemView, data)
    Router.push(url, url, { shallow: true })
}

export function saveItemAction(requestData, callback) {
    axios.post(buildWpApiUrl(wpApiConfig.endpoints.saveItem), requestData)
        .then(response => {
            callback(false, response.data);
        })
        .catch(error => {
            console.error(error)
            callback(true, error);
        });
}

export function saveItemCallback(provider, category, itemId, user_id, e) {
    const data = {
        provider_name: provider,
        category: category,
        item_id: itemId,
        user_id: user_id
    }
    console.log(data)
    saveItemAction(data, saveItemRequestCallback)
    updateSavedItemAction(data)
}


export function saveItemRequestCallback(error, data) {
    console.log(error, data)
}