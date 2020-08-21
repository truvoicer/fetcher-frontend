import {
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import {pageReducer} from "../reducers/page-reducer";
import {listingsReducer} from "../reducers/listings-reducer";
import {searchReducer} from "../reducers/search-reducer";
import {sessionReducer} from "../reducers/session-reducer";

const middleware = [
    ...getDefaultMiddleware(),
    thunk
];
const reducer = {
    page: pageReducer,
    listings: listingsReducer,
    search: searchReducer,
    session: sessionReducer
}

const store = configureStore({
    reducer,
    middleware,
});

export default store;