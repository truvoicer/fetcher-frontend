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
    setHasMoreResults,
} from "../reducers/search-reducer"
import store from "../store";
import {SEARCH_REQUEST_STARTED} from "../constants/search-constants";
import {setSearchRequestStatusAction} from "../actions/search-actions";
import {addQueryDataString} from "../actions/listings-actions";

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

export function setSearchHasMoreResultsMiddleware(hasMoreResults) {
    return function (dispatch) {
        dispatch(setHasMoreResults(hasMoreResults))
    }
}

export function setSearchRequestErrorMiddleware(error) {
    return function (dispatch) {
        dispatch(setSearchError(error))
    }
}


export function loadNextPageNumberMiddleware(pageNumber) {
    setSearchRequestStatusAction(SEARCH_REQUEST_STARTED);
    this.props.addListingsQueryDataString("page_number", pageNumber, true)
}

export function loadNextOffsetMiddleware(page_offset, page_size) {
    setSearchRequestStatusAction(SEARCH_REQUEST_STARTED);
    let pageOffset = parseInt(page_offset);
    let pageSize = parseInt(page_size)
    addQueryDataString("page_offset", pageOffset + pageSize, true)
}
