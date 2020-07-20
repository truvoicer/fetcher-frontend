import store from "../store/index"
import { setSidebarData, setPageError } from "../reducers/page-reducer"
import React from "react";

export function getSidebarData(url) {
    return function(dispatch) {
        // notify about fetch start
        dispatch({ type: "FETCH_USERS_REQUEST" });

        return fetch(url)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(json => {
                store.dispatch(setSidebarData(json))
            })
            .catch(error => {
                console.error(error)
                store.dispatch(setPageError(error.message))
            });
    };
}