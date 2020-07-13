import {wpApiConfig} from "../../../config/wp-api-config";
import {fetcherApiConfig} from "../../../config/fetcher-api-config";
import {getSessionObject, getToken, isAuthenticated, setSession} from "./session/authenticate";
import {isSet} from "../../utils";

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

export const fetchSearchData = (data, callback) => {
    console.log(data)
    if (!validateRequestParams(["keywords"], data)) {
        console.error("Search params validate error");
        return false;
    }
    return fetchData("operation", ["search"], data, callback)
}

export const fetchData = (endpoint, operation, queryData = {}, callback = false) => {
    if(!validateEndpoint(endpoint)) {
        console.error("Endpoint not found")
    }

    if (!isAuthenticated()) {
        getToken().then((response) => {
            setSession(response.data)
            if (callback) {
                responseHandler(fetchFromApi(endpoint, operation, queryData), callback);
            }
        })
    } else {
        if (callback) {
            responseHandler(fetchFromApi(endpoint, operation, queryData), callback);
        }
    }

}

const fetchFromApi = (endpoint, operation, queryData) => {
    let config = {
        url: getApiUrl(endpoint, operation, queryData),
        method: "get",
        headers: {'Authorization': 'Bearer ' + getSessionObject().access_token}
    }
    // console.log(config)

    return axios.request(config);
}

export const responseHandler = (request, callback) => {
    request.then((response) => {
        callback(response.status, response.data);
    })
    .catch((error) => {
        if (isSet(error.response)) {
            if (error.response.status === 401 && error.response.data.message === "token_expired") {
                getToken().then((response) => {
                    setSession(response.data)
                    if (callback) {
                        responseHandler(axios.request(config), callback);
                    }
                })
            }
        }
    })
}

const getApiUrl = (endpoint, operation, queryData = {}) => {
    let baseUrl;
    baseUrl = fetcherApiConfig.apiBaseUrl + vsprintf(fetcherApiConfig.endpoints[endpoint], operation);
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