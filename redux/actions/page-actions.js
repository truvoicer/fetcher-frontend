import store from "../store/index"
import React from "react";
import {setPageError} from "../reducers/page-reducer";

export function setPageErrorAction(error) {
    store.dispatch(setPageError(error))
}