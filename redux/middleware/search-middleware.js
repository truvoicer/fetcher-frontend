import React from "react";
import {
    setSearchStatus,
    setSearchOperation,
    setRequestService,
    setSearchList,
    setExtraData,
    setProvider,
    setCategory,
    setSearchError,
    setPageControls,
} from "../reducers/search-reducer"
import store from "../store";
import {
    PAGE_CONTROL_CURRENT_PAGE,
    PAGE_CONTROL_PAGINATION_REQUEST,
    SEARCH_REQUEST_STARTED
} from "../constants/search-constants";
import {
    runSearch, saveItemAction,
    setSearchRequestStatusAction, updateSavedItemAction
} from "../actions/search-actions";
import {addQueryDataString} from "../actions/listings-actions";
import {getCurrentPageFromOffset, setPageControlItemAction} from "../actions/pagination-actions";
import {buildWpApiUrl} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";

const axios = require('axios');

export function setSearchProviderMiddleware(provider) {
    return function (dispatch) {
        dispatch(setProvider(provider))
    }
}

export function setSearchCategoryMiddleware(category) {
    return function (dispatch) {
        dispatch(setCategory(category))
    }
}

export function setSearchRequestServiceMiddleware(requestService) {
    return function (dispatch) {
        dispatch(setRequestService(requestService))
    }
}

export function setSearchRequestStatusMiddleware(status) {
    return function (dispatch) {
        dispatch(setSearchStatus(status))
    }
}
export function setSearchRequestOperationMiddleware(operation) {
    return function (dispatch) {
        dispatch(setSearchOperation(operation))
    }
}

export function setPageControlItemMiddleware(key, value) {
    return function (dispatch) {
        let pageControlsState = {...store.getState().search.pageControls}
        const pageControlsObject = Object.assign({}, pageControlsState, {
            [key]: value
        });
        dispatch(setPageControls(pageControlsObject))
    }
}

export function setSearchRequestErrorMiddleware(error) {
    return function (dispatch) {
        dispatch(setSearchError(error))
    }
}


export function loadNextPageNumberMiddleware(pageNumber) {
    return function (dispatch) {
        setSearchRequestStatusAction(SEARCH_REQUEST_STARTED);
        setPageControlItemAction(PAGE_CONTROL_PAGINATION_REQUEST, true)
        setPageControlItemAction(PAGE_CONTROL_CURRENT_PAGE, parseInt(pageNumber))
        // addQueryDataString("page_number", pageNumber, true)
        runSearch()
    }
}

export function loadNextOffsetMiddleware(pageOffset) {
    return function (dispatch) {
        setSearchRequestStatusAction(SEARCH_REQUEST_STARTED);
        setPageControlItemAction(PAGE_CONTROL_PAGINATION_REQUEST, true)
        setPageControlItemAction(PAGE_CONTROL_CURRENT_PAGE, getCurrentPageFromOffset(parseInt(pageOffset)))
        addQueryDataString("page_offset", pageOffset, true)
    }
}

export function saveItemMiddleware(requestData, callback) {
    return function(dispatch) {
        saveItemAction(requestData, callback)
    }
}

export function updateSavedItemMiddleware(data) {
    return function (dispatch) {
        updateSavedItemAction(data);
    }
}