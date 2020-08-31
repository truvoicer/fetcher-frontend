import React, {useEffect, useLayoutEffect, useState} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import {convertImageObjectsToArray, isSet} from "../../../library/utils";
import {siteConfig} from "../../../config/site-config";
import {saveItemCallback, showInfo} from "../../../redux/actions/search-actions";
import {LISTINGS_GRID_COMPACT} from "../../../redux/constants/listings-constants";
import {fetchData} from "../../../library/api/fetcher/middleware";
import Grid from "@material-ui/core/Grid";

const SavedItemsVerticalTabs = (props) => {
    const getItemByIndex = (index) => {
        let item = {};
        Object.keys(props.data).map((key, objectIndex) => {
            if (index === objectIndex) {
                item = props.data[key];
            }
        })
        return item;
    }

    const getItemsRequest = (provider_name, new_request = true) => {
        props.data[provider_name]?.items?.map((item) => {
            let data = {
                query: item.item_id,
                provider: item.provider_name,
                category: item.category
            }
            console.log(data)
            fetchData("operation", ["single"], data)
                .then((response) => {
                    if (response.status === 200) {
                        getItemsResponseHandler(response.data, new_request);
                        new_request = false;
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        })
    }

    const handleTabChange = (e, value) => {
        console.log(value)
        setTabValue(value)
        getItemsRequest(value, true)
    }


    const getItemsResponseHandler = (data, new_request) => {
        let itemData = data.request_data[0];
        let getPanelData = {...panelData};
        itemData.category = data.category;
        if (new_request) {
            getPanelData[itemData.provider].items_response.splice(
                0,
                getPanelData[itemData.provider].items_response.length + 1
            )
        }
        getPanelData[itemData.provider].items_response.push(itemData);
        setPanelData(getPanelData);
    }


    const tabProps = (index) => {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const TabPanel = (props) => {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                className={"tab-layout--vertical-panel"}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    const saveItemRequestCallback = (error, data) => {
        console.log(error, data)
    }

    const getGridItem = (item, category) => {
        let gridItem = {...item};
        // console.log(item, category)
        if (isSet(gridItem.image_list)) {
            gridItem.image_list = convertImageObjectsToArray(gridItem.image_list);
        }
        const gridConfig = siteConfig.gridItems;
        if (!isSet(gridConfig[category])) {
            return null;
        }
        if (!isSet(gridConfig[category][LISTINGS_GRID_COMPACT])) {
            return null;
        }
        gridItem.saved_item = true;
        const GridItems = gridConfig[category][LISTINGS_GRID_COMPACT];
        return <GridItems data={gridItem}
                          searchCategory={category}
                          showInfoCallback={showInfo}
                          saveItemCallback={saveItemCallback}/>
    }

    const getItemList = (data) => {
        return (
            <Grid container className={""} spacing={2}>
                {isSet(data) &&
                data.items_response.map((item, index) => (
                    <Grid item xs={4} key={index}>
                        {getGridItem(item, item.category)}
                    </Grid>
                ))
                }
            </Grid>
        )
    }

    const [tabValue, setTabValue] = useState(getItemByIndex(0).name);
    const [panelData, setPanelData] = useState({...props.data});

    useEffect(() => {
        getItemsRequest(getItemByIndex(0).name, true)
    }, [])

    return (
        <div className={"tab-layout"}>
            <Tabs
                // action={getItemsRequest(getItemByIndex(0).name, true)}
                orientation="vertical"
                variant="scrollable"
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Vertical tabs example"
            >
                {Object.keys(props.data).map((itemKey, index) => (
                    <Tab
                        label={props.data[itemKey].label}
                        key={index.toString()}
                        value={itemKey}
                        {...tabProps(index)} />
                ))}
            </Tabs>
            {Object.keys(props.data).map((itemKey, tabDataIndex) => (
                <TabPanel
                    key={tabDataIndex.toString()}
                    value={tabValue}
                    index={itemKey}
                >
                    {getItemList(panelData[itemKey])}
                </TabPanel>
            ))}
        </div>
    );
}
export default SavedItemsVerticalTabs;
