import React from "react";
import {
    getPageDataAction,
    getUserAccountMenuAction, setModalContentAction,
} from "../actions/page-actions";
import {setShowModal} from "../reducers/page-reducer";

export function getPageDataMiddleware(url, params) {
    return function(dispatch) {
        return getPageDataAction(url, params);
    }
}

export function setUserAccountMenuMiddleware() {
    return function(dispatch) {
        return getUserAccountMenuAction();
    }
}

export function showPageModalMiddleware(show) {
    return function (dispatch) {
        dispatch(setShowModal(show))
    }
}

export function setModalContentMiddleware(component, data, show) {
    return function (dispatch) {
        setModalContentAction(component, data, show);
    }
}

