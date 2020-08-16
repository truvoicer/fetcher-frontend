import React, {Component} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import HtmlParser from "react-html-parser";

class TabList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: {
                value: this.props.data.config.initialTab
            }
        }
        console.log(this.props.data.config.initialTab)
        this.tabProps = this.tabProps.bind(this)
        this.tabPanel = this.tabPanel.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
        this.getTabListItemData = this.getTabListItemData.bind(this)
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

    getTabListItemData(item) {
        return (
            <>
            {!Array.isArray(item.dataKey)
                ?
                <>
                    {item.image ? <img src={this.props.item[item.dataKey]}/> : <p>{HtmlParser(this.props.item[item.dataKey])}</p>}
                </>
                :
                <>
                    {item.dataKey.map((dataKeyName, keyIndex) => (
                        <React.Fragment key={keyIndex.toString()}>
                            {item.image ? <img src={this.props.item[dataKeyName]}/> : <p>{HtmlParser(this.props.item[dataKeyName])}</p>}
                        </React.Fragment>
                    ))}
                </>
            }
            </>
        )
    }

    render() {
        return (
            <div className={"tab-layout"}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.tabs.value}
                    onChange={this.handleTabChange}
                    aria-label="Vertical tabs example"
                >
                    {this.props.data.tabs.map((tabItem, index) => (
                        <Tab label={tabItem.label} key={index.toString()} {...this.tabProps(index)} />
                    ))}
                </Tabs>
                {this.props.data.tabs.map((tabItem, index) => (
                    <this.tabPanel key={index.toString()} value={this.state.tabs.value} index={index}>
                        <ul className={"tab-layout--list"}>
                            {tabItem.tabData.map((tabDataItem, tabDataIndex) => (
                                <li key={tabDataIndex.toString()}>
                                    <div className={"tab-layout--list--row"}>
                                        <div className={"tab-layout--list--row--label"}>
                                            {tabDataItem.label}
                                        </div>
                                        <div className={"tab-layout--list--row--value"}>
                                            {this.getTabListItemData(tabDataItem)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </this.tabPanel>
                ))}
            </div>
        );
    }
}

export default TabList;
