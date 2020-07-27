
// AUTH STATE
import {createSlice} from "@reduxjs/toolkit";

const pageState = {
    post: {},
    siteConfig: {},
    sidebar: [],
    topBar: [],
    footer: [],
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
        setTopBarData: (state, action) => {
            state.topBar = action.payload;
        },
        setFooterData: (state, action) => {
            state.footer = action.payload;
        },
        setPageError: (state, action) => {
            state.error = action.payload;
            console.error(state.error)
        },
    },
});

export const pageReducer = pageSlice.reducer;
export const { setPageData, setSidebarData, setTopBarData, setFooterData, setPageError } = pageSlice.actions;