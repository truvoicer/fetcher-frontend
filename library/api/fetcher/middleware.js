import {wpApiConfig} from "../../../config/wp-api-config";
import {fetcherApiConfig} from "../../../config/fetcher-api-config";
import {getSessionObject} from "./session/authenticate";

const axios = require('axios');
const vsprintf = require("sprintf").vsprintf;

export const fetchData = (endpoint, operation, queryData = false) => {
    let baseUrl;
    if (typeof fetcherApiConfig.endpoints[endpoint] === "undefined") {
        console.error("Endpoint not found")
        return false;
    }
    baseUrl = fetcherApiConfig.apiBaseUrl + vsprintf(fetcherApiConfig.endpoints[endpoint], operation);
    let url;
    if (!queryData) {
        let queryData = {};
        queryData.access_token = getSessionObject().access_token;
        url = baseUrl;
    } else {
        queryData.access_token = getSessionObject().access_token;
        url = baseUrl + buildQueryString(queryData);
    }
    // console.log(url)
    return axios.get(url);

}

const buildQueryString = (queryObject = false) => {
    if (queryObject.length === 0) {
        return "";
    }
    let esc = encodeURIComponent;
    return "?" + Object.keys(queryObject)
        .map(k => esc(k) + '=' + esc(queryObject[k]))
        .join('&');
}