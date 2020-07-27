import store from "../store/index"
import { setSidebarData, setTopBarData, setFooterData, setPageError } from "../reducers/page-reducer"
import React from "react";
import {FOOTER_REQUEST, SIDEBAR_REQUEST, TOPBAR_REQUEST} from "../constants/sidebar-constants";

export function getSidebarData(url, sidebarRequest) {
    return function(dispatch) {
        return fetch(url)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(json => {
                switch (sidebarRequest) {
                    case SIDEBAR_REQUEST:
                        dispatch(setSidebarData(json))
                        break;
                    case TOPBAR_REQUEST:
                        dispatch(setTopBarData(json));
                        break;
                    case FOOTER_REQUEST:
                        dispatch(setFooterData(json));
                        break;
                    default:
                        dispatch(setPageError("Sidebar request invalid..."));
                        break;
                }
            })
            .catch(error => {
                console.error(error)
                dispatch(setPageError(error.message))
            });
    };
}