import { setListingsData, setListingsDataProviders, setListingsError} from "../reducers/listings-reducer"
import React from "react";
import store from "../store/index";
import {setPageData, setPageError} from "../reducers/page-reducer";
import {fetchData} from "../../library/api/fetcher/middleware";

export function getProviders(category) {
    console.log(category)
    fetchData("list", [category, "providers"], {}, getProvidersCallback);

}
export function getProvidersCallback(status, data) {
    if (status === 200) {
        console.log(data.data)
        store.dispatch(setListingsDataProviders(data.data))
    } else {
        console.error(data.message)
        store.dispatch(setListingsError(data.message))
    }
}

export function setListingsQueryData() {
    return function(dispatch) {
        // notify about fetch start
        dispatch({ type: "FETCH_USERS_REQUEST" });

    };
}