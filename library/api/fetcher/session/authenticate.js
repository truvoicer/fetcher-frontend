import axios from 'axios';
import React from 'react'
import {fetcherApiConfig} from "../../../../config/fetcher-api-config";


export const getToken = async () => {
    let data = {
        email: fetcherApiConfig.email,
        password: fetcherApiConfig.password
    }
    return axios.post(fetcherApiConfig.apiBaseUrl + fetcherApiConfig.endpoints.getToken, data);
}

// Sets user details in localStorage
export const setSession = (authObject) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authObject.session.expires_at * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authObject.session.access_token);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
}


// removes user details from localStorage
export const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    window.location.replace("/auth/login")
}

export const getSessionObject = () => {
    if(typeof localStorage === 'undefined') {
        return false;
    }
    try {
        let expiresAt = localStorage.getItem('expires_at');
        return {
            access_token: localStorage.getItem('access_token'),
            expires_at: JSON.parse(expiresAt)
        }
    } catch(error) {
        console.error(error);
        return false;
    }
}

export const isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
}
