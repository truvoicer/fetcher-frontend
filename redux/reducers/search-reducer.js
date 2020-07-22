import store from "../store/index"
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {SEARCH_REQUEST_COMPLETED, SEARCH_REQUEST_IDLE} from "../constants/search";
import {setSearchRequestStatus} from "../actions/search-actions";

const searchState = {
    requestStatus: SEARCH_REQUEST_IDLE,
    extraData: {},
    searchList: [],
    requestService: "",
    provider: "",
    category: "",
    error: {}
};

export const searchSlice = createSlice({
    name: "search",
    initialState: searchState,
    reducers: {
        setRequestStatus: (state, action) => {
            state.requestStatus = action.payload;
            console.log(state.requestStatus)
        },
        setExtraData: (state, action) => {
            state.extraData = action.payload;
        },
        setSearchList: (state, action) => {
            state.searchList = action.payload;
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
    setRequestStatus,
    setExtraData,
    setSearchList,
    setRequestService,
    setProvider,
    setCategory,
    setSearchError
} = searchSlice.actions;