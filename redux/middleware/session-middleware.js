import store from "../store/index"
import { setUser, setAuthenticated, setSessionError } from "../reducers/session-reducer"
import {isSet} from "../../library/utils";
import {
    resetSessionErrorAction,
    setSessionErrorAction,
    setSessionLocalStorage,
    setSessionUserAction
} from "../actions/session-actions";
import {buildWpApiUrl, runApiRequest} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";

const axios = require('axios');

export function getSessionTokenMiddleware(url, requestData, callback) {
    return function(dispatch) {
        return axios.post(url, requestData)
            .then(response => {
                if (response.data.success) {
                    setSessionUserAction(response.data.data, true)
                    setSessionLocalStorage(response.data.data.token)
                    callback(false, response.data);
                    // resetSessionErrorAction()
                } else {
                    // setSessionErrorAction(response.data)
                    callback(true, response.data);
                }
            })
            .catch(error => {
                setSessionErrorAction(error)
                callback(true, error.response.data);
            });
    };
}

export function createUserMiddleware(requestData, callback) {
    return function(dispatch) {
        return axios.post(buildWpApiUrl(wpApiConfig.endpoints.createUser), requestData)
            .then(response => {
                callback(false, response.data);
            })
            .catch(error => {
                console.error(error)
                callback(true, error);
            });
    }
}

export function updateUserMiddleware(requestData, callback) {
    return function(dispatch) {
        return axios.post(buildWpApiUrl(wpApiConfig.endpoints.updateUser), requestData)
            .then(response => {
                callback(false, response.data);
            })
            .catch(error => {
                console.error(error)
                callback(true, error);
            });
    }
}

export function updateUserSessionData(data) {
    return function(dispatch) {
        setSessionUserAction(data, true)
    }
}


export function saveItemMiddleware(requestData, callback) {
    return function(dispatch) {
        return axios.post(buildWpApiUrl(wpApiConfig.endpoints.saveItem), requestData)
            .then(response => {
                callback(false, response.data);
            })
            .catch(error => {
                console.error(error)
                callback(true, error);
            });
    }
}