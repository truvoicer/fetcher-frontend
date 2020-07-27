import store from "../store/index"
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {NEW_SEARCH_REQUEST, SEARCH_REQUEST_COMPLETED, SEARCH_REQUEST_IDLE} from "../constants/search-constants";

const searchState = {
    searchStatus: SEARCH_REQUEST_IDLE,
    searchOperation: NEW_SEARCH_REQUEST,
    extraData: {},
    searchList: [],
    hasMoreResults: false,
    requestService: "",
    provider: "",
    category: "",
    error: {}
};

export const searchSlice = createSlice({
    name: "search",
    initialState: searchState,
    reducers: {
        setSearchStatus: (state, action) => {
            state.searchStatus = action.payload;
            console.log(state.searchStatus)
        },
        setSearchOperation: (state, action) => {
            state.searchOperation = action.payload;
            console.log(state.searchOperation)
        },
        setExtraData: (state, action) => {
            state.extraData = action.payload;
        },
        setSearchList: (state, action) => {
            state.searchList = action.payload;
        },
        setHasMoreResults: (state, action) => {
            state.hasMoreResults = action.payload;
        },
        setRequestService: (state, action) => {
            state.requestService = action.payload;
        },
        setProvider: (state, action) => {
            state.provider = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSearchError: (state, action) => {
            console.log(action.payload)
            state.error = action.payload;
        },
    },
});


export const searchReducer = searchSlice.reducer;

export const {
    setSearchStatus,
    setSearchOperation,
    setExtraData,
    setSearchList,
    setHasMoreResults,
    setRequestService,
    setProvider,
    setCategory,
    setSearchError
} = searchSlice.actions;