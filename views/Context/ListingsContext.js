import React from 'react';
export const ListingsContext = React.createContext({
    listingsName: "",
    listingsData: {},
    listingsDataProcess: () => {},
});