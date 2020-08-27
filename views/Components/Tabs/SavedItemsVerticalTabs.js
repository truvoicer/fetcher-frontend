import React, {Component} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import HtmlParser from "react-html-parser";
import {convertImageObjectsToArray, isSet} from "../../../library/utils";
import {siteConfig} from "../../../config/site-config";
import {isSavedItemAction, saveItemAction, saveItemCallback, showInfo} from "../../../redux/actions/search-actions";
import {SESSION_USER_ID} from "../../../redux/constants/session-constants";
import {LISTINGS_GRID_COMPACT} from "../../../redux/constants/listings-constants";
import {fetchData} from "../../../library/api/fetcher/middleware";
import Grid from "@material-ui/core/Grid";

class SavedItemsVerticalTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: {
                value: 0
            },
            panelData: {}
        }
        this.tabProps = this.tabProps.bind(this)
        this.tabPanel = this.tabPanel.bind(this)
        this.getItemList = this.getItemList.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
        this.getItemsRequest = this.getItemsRequest.bind(this)
        this.getItemsRequestCallback = this.getItemsRequestCallback.bind(this)
    }

    componentDidMount() {
        this.getItemsRequest(0)
    }

    getItemsRequest(index) {
        const getItem = this.getItemByIndex(index);
        getItem.items?.map((item) => {
            let data = {
                query: item.item_id,
                provider: item.provider_name
            }
            console.log(data)
            fetchData("operation", ["single"], data, this.getItemsRequestCallback)
        })
    }

    getItemByIndex(index) {
        let item = {};
        Object.keys(this.props.data).map((key, objectIndex) => {
            if (index === objectIndex) {
                item = this.props.data[key];
            }
        })
        return item;
    }

    getItemsRequestCallback(status, data) {
        console.log(status, data)
        if (status === 200) {
            let panelData = {...this.state.panelData};
            if (!isSet(panelData[this.state.tabs.value])) {
                panelData[this.state.tabs.value] = {};
            }
            if (!isSet(panelData[this.state.tabs.value].items)) {
                panelData[this.state.tabs.value].items = []
            }
            let itemData = data.request_data[0];
            itemData.category = data.category;
            panelData[this.state.tabs.value].items.push(itemData);
            this.setState({
                panelData: panelData
            })
        }
    }

    handleTabChange(e, value) {
        console.log(value, e)
        let panelData = {...this.state.panelData};

        if (isSet(panelData[this.state.tabs.value]) && isSet(isSet(panelData[this.state.tabs.value].items))) {
            panelData[this.state.tabs.value].items = []
        }
        this.setState({
            tabs: {
                value: value
            },
            panelData: panelData
        })
        this.getItemsRequest(value)
    }

    tabProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    tabPanel(props) {
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

    saveItemRequestCallback(error, data) {
        console.log(error, data)
    }

    getGridItem(item, category) {
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
        //     category, this.props.user[SESSION_USER_ID]);
        const GridItems = gridConfig[category][LISTINGS_GRID_COMPACT];
        console.log(GridItems)
        return <GridItems data={gridItem}
                          searchCategory={category}
                          showInfoCallback={showInfo}
                          saveItemCallback={saveItemCallback}/>
    }

    getItemList(data, tabDataIndex) {
        return (
            <Grid container className={""} spacing={2}>
                {isSet(this.state.panelData[tabDataIndex]) &&
                this.state.panelData[tabDataIndex].items.map((item, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={4}>
                            {this.getGridItem(item, item.category)}
                        </Grid>
                    </React.Fragment>
                ))
                }
            </Grid>
        )
    }

    render() {
        console.log(this.props.data)
        return (
            <div className={"tab-layout"}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.tabs.value}
                    onChange={this.handleTabChange}
                    aria-label="Vertical tabs example"
                >
                    {Object.keys(this.props.data).map((itemKey, index) => (
                        <Tab label={this.props.data[itemKey].label} key={index.toString()} {...this.tabProps(index)} />
                    ))}
                </Tabs>
                {Object.keys(this.props.data).map((itemKey, tabDataIndex) => (
                    <this.tabPanel key={tabDataIndex.toString()} value={this.state.tabs.value} index={tabDataIndex}>
                        {this.getItemList(this.props.data[itemKey].items, tabDataIndex)}
                    </this.tabPanel>
                ))}
            </div>
        );
    }
}

export default SavedItemsVerticalTabs;
