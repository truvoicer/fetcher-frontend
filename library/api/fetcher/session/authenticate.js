import axios from 'axios';
import React from 'react'
import {fetcherApiConfig} from "../../../../config/fetcher-api-config";

export const checkApiToken = () => {
    return axios.post(fetcherApiConfig.apiBaseUrl + fetcherApiConfig.endpoints.getToken,
        {access_token: process.env.NEXT_PUBLIC_FETCHER_API_TOKEN});
}
