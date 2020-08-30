import store from "../store/index"
import React from "react";
import {
    setBlocksData,
    setFooterData,
    setPageData,
    setPageError,
    setSidebarData,
    setTopBarData, setUserAccountMenuData
} from "../reducers/page-reducer";
import {setCategory, setListingsData} from "../reducers/listings-reducer";
import {isSet} from "../../library/utils";
import {getListingsProviders} from "../middleware/listings-middleware";
import {FOOTER_REQUEST, SIDEBAR_REQUEST, TOPBAR_REQUEST} from "../constants/sidebar-constants";
import {buildWpApiUrl} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";
import {siteConfig} from "../../config/site-config";

export function setPageErrorAction(error) {
    store.dispatch(setPageError(error))
}


export function getPageDataAction(pageUrl, params) {
        // notify about fetch start
    let url = pageUrl + "?" + new URLSearchParams(params).toString();
        return fetch(url)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(json => {
                store.dispatch(setPageData(json))
                if (json.blocks_data !== null) {
                    store.dispatch(setBlocksData(json.blocks_data))
                    store.dispatch(setListingsData(json.blocks_data.tru_fetcher_listings))
                    if (isSet(json.blocks_data.tru_fetcher_listings) &&
                        isSet(json.blocks_data.tru_fetcher_listings.listing_block_category) &&
                        isSet(json.blocks_data.tru_fetcher_listings.listing_block_category.slug)
                    ) {
                        const category = json.blocks_data.tru_fetcher_listings.listing_block_category.slug
                        store.dispatch(setCategory(category))
                        getListingsProviders(category)
                    }
                }
            })
            .catch(error => {
                console.error(error)
                store.dispatch(setPageError(error.message))
            });
}

export function setUserAccountMenuAction(menu) {
    store.dispatch(setUserAccountMenuData(menu))
}


export function getUserAccountMenuAction() {
    return fetch(buildWpApiUrl(wpApiConfig.endpoints.menu, siteConfig.myAccountMenu))
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(json => {
            setUserAccountMenuAction(json)
        })
        .catch(error => {
            console.error(error)
            store.dispatch(setPageError(error.message))
        });
}