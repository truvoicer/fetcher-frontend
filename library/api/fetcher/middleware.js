import {wpApiConfig} from "../../../config/wp-api-config";
import {fetcherApiConfig} from "../../../config/fetcher-api-config";
import {getSessionObject} from "./session/authenticate";

const axios = require('axios');
const vsprintf = require("sprintf").vsprintf;


export const validateRequestParams = (requiredParams, queryData) => {
    if (isEmpty(queryData)) {
        return false;
    }
    for(let i=0;i<queryData.length;i++) {
        for(let r=0;r<requiredParams.length;r++) {
            if (!Object.keys(queryData).contains(requiredParams[r])) {
                console.log(requiredParams[r])
                return false;
            }
        }
    }
    return true;
}

export const isEmpty = (object) => {
    for(let key in object) {
        if(object.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const fetchSearchData = (data) => {
    // console.log(data)
    if (!validateRequestParams(["keywords"], data)) {
        console.error("Search params validate error");
        return false;
    }
    return fetchData("operation", "search", data)
}

export const fetchData = (endpoint, operation, queryData = {}) => {
    if(!validateEndpoint(endpoint)) {
        console.error("Endpoint not found")
    }
    let url = getApiUrl(endpoint, operation, queryData);
    console.log(url)
    return axios.get(url);
}

const getApiUrl = (endpoint, operation, queryData = {}) => {
    let baseUrl;
    baseUrl = fetcherApiConfig.apiBaseUrl + vsprintf(fetcherApiConfig.endpoints[endpoint], operation);
    queryData.access_token = getSessionObject().access_token;
    return  baseUrl + (isEmpty(!buildQueryString(queryData))? buildQueryString(queryData) : "");
}

const validateEndpoint = (endpoint) => {
    if (typeof fetcherApiConfig.endpoints[endpoint] === "undefined") {
        return false;
    }
    return true;
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