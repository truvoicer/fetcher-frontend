import store from "../store/index"
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";
import {LISTINGS_GRID_COMPACT} from "../constants/listings-constants";

const listingsState = {
    listingsGrid: LISTINGS_GRID_COMPACT,
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
        setListingsGrid: (state, action) => {
            state.listingsGrid = action.payload;
        },
        setListingsData: (state, action) => {
            state.listingsData = action.payload;
        },
        setListingsQueryData: (state, action) => {
            // console.log(action.payload)
            state.listingsQueryData = action.payload;
            console.log(state.listingsQueryData)
        },
        setListingsSearchResults: (state, action) => {
            state.listingsSearchResults = action.payload;
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
    setListingsGrid,
    setListingsData,
    setListingsDataProviders,
    setListingsQueryData,
    setListingsSearchResults,
    setListingsError
} = listingsSlice.actions;