import {
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import {pageReducer} from "../reducers/page-reducer";
import {listingsReducer} from "../reducers/listings-reducer";

const middleware = [
    ...getDefaultMiddleware(),
    thunk
];
const reducer = {
    page: pageReducer,
    listings: listingsReducer
}

const store = configureStore({
    reducer,
    middleware,
});

export default store;