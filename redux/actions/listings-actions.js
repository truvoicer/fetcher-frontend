import React from "react";
import store from "../store/index";
import {fetchData} from "../../library/api/fetcher/middleware";
import {
    setListingsData,
    setListingsQueryData,
    setListingsDataProviders,
    setListingsError
} from "../reducers/listings-reducer"
import {isSet} from "../../library/utils";
import {runSearch} from "./search-actions";


export function getListingsProviders(category) {
    fetchData("list", [category, "providers"], {}, getProvidersCallback);

}
export function getProvidersCallback(status, data) {
    if (status === 200) {
        // console.log(data.data)
        store.dispatch(setListingsDataProviders(data.data))
    } else {
        // console.error(data.message)
        store.dispatch(setListingsError(data.message))
    }
}

export function addArrayItem(key, value) {
    return function(dispatch) {
        let listingsQueryData = {...store.getState().listings.listingsQueryData}
        const object = Object.assign({}, listingsQueryData, {
            [key]: (isSet(listingsQueryData[key]))? listingsQueryData[key].concat(value) : [value]
        });
        dispatch(setListingsQueryData(object))
    }
}

export function removeArrayItem(key, value) {
    return function(dispatch) {
        let listingsQueryData = {...store.getState().listings.listingsQueryData}
        let index = listingsQueryData[key].indexOf(value);
        const newArray = [...listingsQueryData[key]]
        newArray.splice(index, 1)
        if (index === -1) return;

        const object = Object.assign({}, listingsQueryData, {
            [key]: newArray
        });
        dispatch(setListingsQueryData(object))
    }
}

export function addListingsQueryDataString(key, value, search = false) {
    return function(dispatch) {
        let listingsQueryData = {...store.getState().listings.listingsQueryData}

        const object = Object.assign({}, listingsQueryData, {
                [key]: value
        });
        // console.log(object)
        dispatch(setListingsQueryData(object))
        if (search) {
            runSearch();
        }
    }
}