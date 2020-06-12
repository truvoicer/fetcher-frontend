import {wpApiConfig} from "../../../config/wp-api-config";
import {fetcherApiConfig} from "../../../config/fetcher-api-config";
import {getSessionObject} from "./session/authenticate";

const axios = require('axios');
const sprintf = require("sprintf").sprintf;

export const fetchData = (queryData, endpoint, operation) => {
    let baseUrl;
    if (typeof fetcherApiConfig.endpoints[endpoint] === "undefined") {
        console.error("Endpoint not found")
        return false;
    }
    if (typeof fetcherApiConfig.endpoints[endpoint][operation] === "undefined") {
        console.error("Endpoint operation not found")
        return false;
    }
    baseUrl = fetcherApiConfig.apiBaseUrl + fetcherApiConfig.endpoints[endpoint][operation];

    queryData.access_token = getSessionObject().access_token;
    let url = baseUrl + buildQueryString(queryData);
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