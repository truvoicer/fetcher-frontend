import React, {useEffect, useState} from 'react';
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
    const [tabValue, setTabValue] = useState(0);
    const [panelData, setPanelData] = useState({});

    let tabIndex = 0;
    const getItemsRequest = (index) => {
        tabIndex = index;
        const getItem = getItemByIndex(index);
        getItem.items?.map((item) => {
            let data = {
                query: item.item_id,
                provider: item.provider_name
            }
            console.log(data)
            fetchData("operation", ["single"], data, getItemsRequestCallback)
        })
    }

    // useEffect(() => {
    //     getItemsRequest(0)
    // })

    const getItemByIndex = (index) => {
        let item = {};
        Object.keys(props.data).map((key, objectIndex) => {
            if (index === objectIndex) {
                item = props.data[key];
            }
        })
        return item;
    }

    const getItemsRequestCallback = (status, data) => {
        // console.log(status, data)
        if (status === 200) {
            console.log(tabIndex)
            let getPanelData = {...panelData};
            if (!isSet(getPanelData[tabIndex])) {
                getPanelData[tabIndex] = {};
            }
            if (!isSet(getPanelData[tabIndex].items)) {
                getPanelData[tabIndex].items = []
            }
            let itemData = data.request_data[0];
            itemData.category = data.category;
            getPanelData[tabIndex].items.push(itemData);
            setPanelData(getPanelData)
        }
    }

    const handleTabChange = (e, value) => {
        console.log(value)
        setTabValue(value)
        getItemsRequest(value)
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
        console.log(item, category)
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
        // gridItem.saved_item = isSavedItemAction(item.item_id, item.provider,
        //     category, props.user[SESSION_USER_ID]);
        const GridItems = gridConfig[category][LISTINGS_GRID_COMPACT];
        // console.log(GridItems)
        return <GridItems data={gridItem}
                          searchCategory={category}
                          showInfoCallback={showInfo}
                          saveItemCallback={saveItemCallback}/>
    }

    const getItemList = (data, tabDataIndex, tabIndexValue) => {
        console.log(panelData[tabIndexValue])

        return (
            <Grid container className={""} spacing={2}>
                {isSet(panelData[tabIndexValue]) &&
                panelData[tabIndexValue].items.map((item, index) => (
                        <Grid item xs={4}  key={index}>
                            {getGridItem(item, item.category)}
                        </Grid>
                ))
                }
            </Grid>
        )
    }

    return (
        <div className={"tab-layout"}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Vertical tabs example"
            >
                {Object.keys(props.data).map((itemKey, index) => (
                    <Tab label={props.data[itemKey].label} key={index.toString()} {...tabProps(index)} />
                ))}
            </Tabs>
            {Object.keys(props.data).map((itemKey, tabDataIndex) => (
                <TabPanel key={tabDataIndex.toString()} value={tabValue} index={tabDataIndex}>
                    {getItemList(props.data[itemKey].items, tabDataIndex, tabValue)}
                </TabPanel>
            ))}
        </div>
    );
}
export default SavedItemsVerticalTabs;
