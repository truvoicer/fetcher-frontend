import {fetchSearchData} from "./middleware";
import {imageSelector, isSet} from "../../utils";
let completed = false;

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
        // console.log(context.listingsData.providers.length)
        queryData.providers = [];
        context.listingsData.providers.map((provider, index) => {
            queryData.provider = provider.provider_name;
            queryData.providers.push(provider.provider_name)
            completed = (context.listingsData.providers.length === index + 1);
            fetchSearchData(queryData, callback, completed);
        });
    } else {
        queryData.providers.map((provider, index) => {
            queryData.provider = provider;
            completed = (queryData.providers.length === index + 1);
            fetchSearchData(queryData, callback, completed);
        });
    }
    // console.log(queryData)
}

export const getDefaultImage = (item) => {
    if (!isSet(item.image_list)) {
        return null
    }
    let selectImage = imageSelector("medium", item.image_list.images);
    if (selectImage) {
        return selectImage.url;
    }
    if (isSet(item.item_default_image) && item.item_default_image !== "") {
        return item.item_default_image;
    }
    if(isSet(item.image_list.default_image) &&
        isSet(item.image_list.default_image.url) &&
        item.image_list.default_image.url !== "") {
        return item.image_list.default_image.url;
    }
    return null;
}