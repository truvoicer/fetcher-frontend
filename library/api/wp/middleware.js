import {wpApiConfig} from "../../../config/wp-api-config";

const axios = require('axios');
const sprintf = require("sprintf").sprintf;

export const fetchWpSiteData = () => {
    return axios.get(wpApiConfig.apiBaseUrl);
}
export const fetchWpData = (endpoint, param) => {

    const url = sprintf(wpApiConfig.apiBaseUrl + endpoint, param);
    console.log(param, url)
    return axios.get(url);
}

export const buildWpApiUrl = (endpoint, param) => {
    return sprintf(wpApiConfig.apiBaseUrl + endpoint, param);
}