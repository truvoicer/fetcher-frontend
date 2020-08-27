import React, {Component} from 'react';
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import {isSet} from "../../../library/utils";
import {wpApiConfig} from "../../../config/wp-api-config";

class TabLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: {
                value: 0
            }
        }
        this.tabProps = this.tabProps.bind(this)
        this.tabPanel = this.tabPanel.bind(this)
        this.getTabComponent = this.getTabComponent.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            tabs: {
                value: this.props.tabIndex
            }
        })
    }

    handleTabChange(e, value) {
        this.setState({
            tabs: {
                value: value
            }
        })
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

    getTabComponent(tabItem) {
        if (isSet(wpApiConfig.components[tabItem.tab_component])) {
            const TabComponent = wpApiConfig.components[tabItem.tab_component].component;
            return <TabComponent data={tabItem} />
        }
        return null
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Tabs
                        value={this.state.tabs.value}
                        onChange={this.handleTabChange}
                        aria-label="simple tabs example"
                    >
                        {this.props.data.map((tabItem, index) => (
                            <Tab
                                key={index.toString()}
                                label={tabItem.tab_label}
                                {...this.tabProps(index)}
                            />
                        ))}
                    </Tabs>
                </AppBar>
                {this.props.data.map((tabItem, index) => (
                    <this.tabPanel
                    key={index.toString()}
                    value={this.state.tabs.value}
                    index={index}
                    >
                    {/*<h2>{tabItem.panel_heading}</h2>*/}
                    {this.getTabComponent(tabItem)}
                    </this.tabPanel>
                    ))}
            </div>
        );
    }
}

export default TabLayout;
