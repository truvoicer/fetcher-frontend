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

export function setSearchProvider(provider) {
    return function (dispatch) {
        dispatch(setProvider(provider))
    }
}

export function setSearchCategory(category) {
    return function (dispatch) {
        dispatch(setCategory(category))
    }
}

export function setSearchRequestService(requestService) {
    return function (dispatch) {
        dispatch(setRequestService(requestService))
    }
}

export function setSearchRequestStatus(status) {
    return function (dispatch) {
        dispatch(setSearchStatus(status))
    }
}
export function setSearchRequestOperation(operation) {
    return function (dispatch) {
        dispatch(setSearchOperation(operation))
    }
}

export function setSearchHasMoreResults(hasMoreResults) {
    return function (dispatch) {
        dispatch(setHasMoreResults(hasMoreResults))
    }
}

export function setSearchRequestError(error) {
    return function (dispatch) {
        dispatch(setSearchError(error))
    }
}
