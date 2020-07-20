
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";

const pageState = {
    post: {},
    siteConfig: {},
    sidebar: [],
    error: {}
};

export const pageSlice = createSlice({
    name: "page",
    initialState: pageState,
    reducers: {
        setPageData: (state, action) => {
            state.post = action.payload.post;
            state.siteConfig = action.payload.site_config;
        },
        setSidebarData: (state, action) => {
            state.sidebar = action.payload;
        },
        setPageError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const pageReducer = pageSlice.reducer;
export const { setPageData, setSidebarData, setPageError } = pageSlice.actions;