import React from "react";
import {
    getPageDataAction,
    getUserAccountMenuAction,
} from "../actions/page-actions";

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

