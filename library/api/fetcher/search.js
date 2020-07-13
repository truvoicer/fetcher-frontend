import {fetchSearchData} from "./middleware";
import {isSet} from "../../utils";

const getSearchData = (queryData, callback) => {
    queryData.limit = 10;
    queryData.location = "london";
    fetchSearchData(queryData, callback);
}

export const runSearch = (callback, context) => {
    // console.log(context)
    if(!isSet(context.listingsData) ||
        !isSet(context.listingsData.listing_block_category)) {
        return false;
    }
    let queryData = context.listingsQueryData;
    if (!isSet(context.listingsQueryData["keywords"])) {
        queryData.keywords = ""
    }
    if (!isSet(queryData.providers) || queryData.providers.length === 0) {
        context.listingsData.providers.map((provider, index) => {
            queryData.provider = provider.provider_name;
            getSearchData(queryData, callback);
        });
    } else {
        queryData.providers.map((provider, index) => {
            queryData.provider = provider;
            getSearchData(queryData, callback);
        });
    }
}

export const getDefaultImage = (item) => {
    if (isSet(item.event_default_image) && item.event_default_image !== "") {
        return item.event_default_image;
    }
    if(isSet(item.image_list) &&
        isSet(item.image_list.default_image) &&
        isSet(item.image_list.default_image.url) &&
        item.image_list.default_image.url !== "") {
        return item.image_list.default_image.url;
    }
    return null;
}