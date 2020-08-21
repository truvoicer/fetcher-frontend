import store from "../store/index"
import { setUser, setAuthenticated, setSessionError } from "../reducers/session-reducer"
import {isSet} from "../../library/utils";
import {setSessionLocalStorage, setSessionUserAction} from "../actions/session-actions";

const axios = require('axios');

export function getSessionTokenMiddleware(url, requestData) {
    return function(dispatch) {
        return axios.post(url, requestData)
            .then(response => {
                // console.log(response.data)
                setSessionUserAction(response.data.data, true)
                setSessionLocalStorage(response.data.data.token)
            })
            .catch(error => {
                // console.error(error)
                dispatch(setSessionError(error.message))
            });
    };
}