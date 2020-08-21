import {wpApiConfig} from "../../../config/wp-api-config";
import {isSet} from "../../utils";
import {getSessionUserAction} from "../../../redux/actions/session-actions";

const axios = require('axios');
const sprintf = require("sprintf").sprintf;

export const buildWpApiUrl = (endpoint, param = "") => {
    return sprintf(wpApiConfig.apiBaseUrl + endpoint, param);
}

export const runApiRequest = (method, endpoint, endpointParam = "", requestData = {}, callback = false) => {
    if(!getSessionUserAction().authenticated) {
        console.error("User not authenticated");
    }
    if (callback) {
        responseHandler(fetchFromApi(method, endpoint, endpointParam, requestData), callback);
    } else {
        return fetchFromApi(method, endpoint, endpointParam, requestData);
    }
}

const fetchFromApi = (method, endpoint, endpointParam, requestData) => {
    let config = {
        url: buildWpApiUrl(endpoint, endpointParam),
        method: method,
        data: requestData,
        headers: {'Authorization': 'Bearer ' + getSessionUserAction().token}
    }
    return axios.request(config);
}


export const responseHandler = (request, callback) => {
    request.then((response) => {
        callback(response.status, response.data);
    })
    .catch((error) => {
        if (callback && isSet(error.response)) {
            callback(error.response.status, error.response.data);
        } else {
            console.error(error)
        }
    })
}
