import {wpApiConfig} from "../../../config/wp-api-config";
import {fetcherApiConfig} from "../../../config/fetcher-api-config";
import {getSessionObject, getToken, isAuthenticated, setSession} from "./session/authenticate";
import {isEmpty, isSet} from "../../utils";

const axios = require('axios');
const vsprintf = require("sprintf").vsprintf;

export const validateRequestParams = (requiredParams, queryData) => {
    if (isEmpty(queryData)) {
        return false;
    }
    let failParams = [];
    for(let i=0;i<queryData.length;i++) {
        for(let r=0;r<requiredParams.length;r++) {
            if (!Object.keys(queryData).contains(requiredParams[r])) {
                failParams.push(requiredParams[r])
            }
        }
    }
    if (failParams.length > 0) {
        return failParams;
    }
    return true;
}

export const fetchData = (endpoint, operation, queryData = {}, callback = false, completed = false) => {
    if(!validateEndpoint(endpoint)) {
        console.error("Endpoint not found")
    }

    if (!isAuthenticated()) {
        getToken().then((response) => {
            setSession(response.data)
            if (callback) {
                responseHandler(fetchFromApi(endpoint, operation, queryData), callback, completed);
            } else {
                return fetchFromApi(endpoint, operation, queryData);
            }
        })
    } else {
        if (callback) {
            responseHandler(fetchFromApi(endpoint, operation, queryData), callback, completed);
        } else {
            return fetchFromApi(endpoint, operation, queryData);
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

export const responseHandler = (request, callback, completed = false) => {
    request.then((response) => {
        callback(response.status, response.data, completed);
    })
    .catch((error) => {
        if (isSet(error.response)) {
            if (error.response.status === 401 && error.response.data.message === "token_expired") {
                getToken().then((response) => {
                    setSession(response.data)
                    if (callback) {
                        error.response.config.headers = {'Authorization': 'Bearer ' + getSessionObject().access_token}
                        responseHandler(axios.request(error.response.config), callback);
                    }
                })
            } else {
                if (callback && isSet(error.response)) {
                    callback(error.response.status, error.response.data);
                } else {
                    console.error(error)
                }
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