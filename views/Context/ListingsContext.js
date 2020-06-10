import React from 'react';
export const ListingsContext = React.createContext({
    listingsData: {},
    listingsQueryData: {},
    setListingsData: () => {},
    setlistingsQueryData: () => {}
});