import React, {Component} from 'react';
import TabList from "../../../../../Tabs/TabList";
import {RealEstateTabConfig} from "../../../../../../../config/tabs/item/real-estate";
import {RetailTabConfig} from "../../../../../../../config/tabs/item/retail";
import {formatDate, getDefaultImage} from "../../../../../../../library/utils";
import HtmlParser from "react-html-parser";

class RetailItemView extends Component {
    constructor(props) {
        super(props);
        this.getTabConfig = this.getTabConfig.bind(this)
    }

    getTabConfig() {
        let tabConfig = RetailTabConfig;
        tabConfig.config.initialTab = 1
        return tabConfig;
    }

    render() {
        return (

            <div className="mb-4">
                <div className={"item-view"}>
                    <div className={"item-view--heading"}>
                        <h4 className="h5 mb-4 text-black">
                            {this.props.data.item_title}
                        </h4>
                    </div>
                    <div className={"item-view--body"}>
                        <div className={"item-view--body--left"}>
                            <img src={this.props.data.item_image_url}
                                 alt="Image"
                                 className="img-fluid rounded"/>
                        </div>
                        <div className={"item-view--body--right"}>
                            <ul className={"item-view--info-list"}>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Provider:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.provider}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Name:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_title}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Seller:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_seller}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Condition:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_condition}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Location:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        <span>{this.props.data.item_region}</span>
                                        <span>{this.props.data.item_city}</span>
                                        <span>{this.props.data.item_country}</span>
                                        <span>{this.props.data.item_post_code}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Discount:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        <span>{this.props.data.item_discount_percentage}</span>
                                        <span>{this.props.data.item_discount_price}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Brand:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_brand}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Color:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_color}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Return Method:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_return_method}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Refund Method:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_refund_method}
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-view--info-list--label"}>
                                        Price:
                                    </div>
                                    <div className={"item-view--info-list--value"}>
                                        {this.props.data.item_price} {this.props.data.item_currency}
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <p>{HtmlParser(this.props.data.item_description)}</p>

                    <a href={this.props.data.item_href}
                       className="btn btn-primary">
                        Buy Now
                    </a>
                </div>
            </div>
        );
    }
}


export default RetailItemView;
