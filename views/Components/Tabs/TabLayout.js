import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import {isSet} from "../../../library/utils";
import {wpApiConfig} from "../../../config/wp-api-config";

const TabLayout = (props) => {
    const [tabValue, setTabValue] = useState(0);

    // useEffect(() => {
    //     setTabValue(props.tabIndex)
    // })

    const handleTabChange = (e, value) => {
        setTabValue(value)
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

    const getTabComponent = (tabItem) => {
        if (isSet(wpApiConfig.components[tabItem.tab_component])) {
            const TabComponent = wpApiConfig.components[tabItem.tab_component].component;
            return <TabComponent data={tabItem}/>
        }
        return null
    }

    return (
        <div>
            <AppBar position="static">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="simple tabs example"
                >
                    {props.data.map((tabItem, index) => (
                        <Tab
                            key={index.toString()}
                            label={tabItem.tab_label}
                            {...tabProps(index)}
                        />
                    ))}
                </Tabs>
            </AppBar>
            {props.data.map((tabItem, index) => (
                <TabPanel
                    key={index.toString()}
                    value={tabValue}
                    index={index}
                >
                    {/*<h2>{tabItem.panel_heading}</h2>*/}
                    {getTabComponent(tabItem)}
                </TabPanel>
            ))}
        </div>
    );
}
export default TabLayout;
