import Modal from "react-bootstrap/Modal";
import React from "react";
import {formatDate} from "../../../../../../../library/utils";
import {fetchData, responseHandler} from "../../../../../../../library/api/fetcher/middleware";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import HtmlParser from "react-html-parser";
import TabList from "../../../../../Tabs/TabList";

class RealEstateInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                showItem: false,
                itemError: "",
                item: {}
            },
        }
        this.fetchItemCallback = this.fetchItemCallback.bind(this)
        this.getTabsConfig = this.getTabsConfig.bind(this)
    }

    componentDidMount() {
        let data = {
            query: this.props.data.item.item_id,
            provider: this.props.data.item.provider
        }
        fetchData("operation", ["single"], data, this.fetchItemCallback)
    }

    fetchItemCallback(status, data) {
        console.log(status, data)
        if (status === 200) {
            this.setState({
                data: {
                    showItem: true,
                    item: data.requestData[0]
                }
            })
        } else {
            this.setState({
                data: {
                    showItem: false,
                    itemError: "Item fetch error..."
                }
            })
        }
    }

    getTabsConfig() {
        return {
            config: {
                initialTab: 0
            },
            tabs: [
                {
                    label: "Images",
                    tabData: [
                        {
                            label: "",
                            image: true,
                            dataKey: "item_default_image"
                        }
                    ]
                },
                {
                    label: "Overview",
                    tabData: [
                        {
                            label: "Status:",
                            dataKey: "item_status"
                        },
                        {
                            label: "Summary:",
                            dataKey: "item_summary"
                        },
                    ]
                },
                {
                    label: "Details",
                    tabData: [
                        {
                            label: "Property Type:",
                            dataKey: "item_property_type"
                        },
                        {
                            label: "Bedrooms:",
                            dataKey: "item_bedrooms"
                        },
                        {
                            label: "Bathrooms:",
                            dataKey: "item_bathrooms"
                        },
                        {
                            label: "Receptions:",
                            dataKey: "item_receptions"
                        },
                        {
                            label: "Floors:",
                            dataKey: "item_floors"
                        },
                        {
                            label: "Description:",
                            dataKey: "item_description"
                        },
                    ]
                },
                {
                    label: "Location",
                    tabData: [
                        {
                            label: "location:",
                            dataKey: [
                                "item_city",
                                "item_country",
                                "item_post_code",
                            ]
                        },
                    ]
                },
                {
                    label: "Price",
                    tabData: [
                        {
                            label: "Total Price:",
                            dataKey: "item_price_total"
                        },
                    ]
                },
                {
                    label: "Agent",
                    tabData: [
                        {
                            label: "Agent Name:",
                            dataKey: "item_agent_name"
                        },
                        {
                            label: "Agent Logo:",
                            image: true,
                            dataKey: "item_agent_logo"
                        },
                        {
                            label: "Agent Contact:",
                            dataKey: "item_agent_contact"
                        },
                    ]
                },
            ]
        }
    }

    render() {
        return (
            <Modal show={this.props.data.show} onHide={this.props.close} size={"lg"}>
                <Modal.Body>
                    {this.state.data.item && this.state.data.showItem &&
                    <div className={"item-info"}>
                        <div className={"item-info--header"}>
                            <h3 className={"item-info--title"}>
                                {this.state.data.item.item_property_type} {this.state.data.item.item_post_code}
                            </h3>
                            <a href={this.state.data.item.item_url}
                               className="btn btn-outline-secondary btn-md">
                                View
                            </a>
                        </div>
                        <div className={"item-info--tabs"}>
                        <TabList data={this.getTabsConfig()} item={this.state.data.item} />
                        </div>
                    </div>
                    }
                    {!this.state.data.showItem && <div>{this.state.data.itemError}</div>}
                </Modal.Body>
            </Modal>
        )
    }
}

export default RealEstateInfoModal;