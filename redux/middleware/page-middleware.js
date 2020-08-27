import store from "../store/index"
import { setPageData, setBlocksData, setPageError } from "../reducers/page-reducer"
import { setListingsData, setCategory } from "../reducers/listings-reducer"
import React from "react";
import {isSet} from "../../library/utils";
import {getListingsProviders} from "./listings-middleware";
import {getMenuAction, getPageDataAction} from "../actions/page-actions";

export function getPageDataMiddleware(url, params) {
    return function(dispatch) {
        return getPageDataAction(url, params);
    }
}

export function getMenuMiddleware(url, callback) {
    return function(dispatch) {
        return getMenuAction(url, callback);
    }
}

