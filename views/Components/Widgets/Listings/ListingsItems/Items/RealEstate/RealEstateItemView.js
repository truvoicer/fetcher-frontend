import React, {Component} from 'react';
import ItemViewVerticalTabList from "../../../../../Tabs/ItemViewVerticalTabList";
import {RealEstateTabConfig} from "../../../../../../../config/tabs/item/real-estate";
import {RetailTabConfig} from "../../../../../../../config/tabs/item/retail";
import HtmlParser from "react-html-parser";

class RealEstateItemView extends Component {
    constructor(props) {
        super(props);
        this.getTabConfig = this.getTabConfig.bind(this)
    }

    getTabConfig() {
        let tabConfig = RealEstateTabConfig;
        tabConfig.config.initialTab = 1
        return tabConfig;
    }

    render() {
        return (

            <div className="mb-4">
                <div className={"item-view"}>
                    <div className={"item-view--heading"}>
                        <h4 className="h5 mb-4 text-black">
                            {this.props.data.item_property_type} {this.props.data.item_post_code}
                        </h4>
                    </div>
                    <div className={"item-view--body"}>
                        <div className={"item-view--body--left"}>
                            <img src={this.props.data.item_default_image}
                                 alt="Image"
                                 className="img-fluid rounded"/>
                        </div>
                        <div className={"item-view--body--right"}>
                            <ul className={"item-view--info-list"}>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Name:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_property_type} {this.props.data.item_post_code}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Property Type:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_property_type}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Bedrooms:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_bedrooms}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Bathrooms:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_bathrooms}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Receptions:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_receptions}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Floors:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_floors}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Location:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_city}
                                        {this.props.data.item_country}
                                        {this.props.data.item_post_code}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Agent:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_agent_name}
                                        <img src={this.props.data.item_logo} />
                                        {this.props.data.item_contact}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Price:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_price_total}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3>Description:</h3>
                    <p>{HtmlParser(this.props.data.item_description)}</p>

                    <a href={this.props.data.item_url}
                       className="btn btn-primary">
                        Get In Touch
                    </a>
                </div>
            </div>
        );
    }
}

export default RealEstateItemView;
