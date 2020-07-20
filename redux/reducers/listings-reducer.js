import store from "../store/index"
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";

const listingsState = {
    listingsData: {},
    listingsQueryData: {},
    listingsSearchResults: {},
    listingsRequestStatus: "",
    error: {}
};

export const listingsSlice = createSlice({
    name: "listings",
    initialState: listingsState,
    reducers: {
        setListingsData: (state, action) => {
            state.listingsData = action.payload;
        },
        setListingsQueryData: (state, action) => {
            state.listingsData = action.payload;
        },
        setListingsSearchResults: (state, action) => {
            state.listingsData = action.payload;
        },
        setListingsDataProviders: (state, action) => {
            state.listingsData.providers = action.payload;
        },
        setListingsError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const listingsReducer = listingsSlice.reducer;
export const {
    setListingsData,
    setListingsDataProviders,
    setListingsQueryData,
    setListingsSearchResults,
    setListingsError
} = listingsSlice.actions;