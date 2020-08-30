import React from 'react';
import {RetailTabConfig} from "../../../../../../../config/tabs/item/retail";
import HtmlParser from "react-html-parser";

const RetailItemView = (props) => {

    const getTabConfig = () => {
        let tabConfig = RetailTabConfig;
        tabConfig.config.initialTab = 1
        return tabConfig;
    }

    return (
        <div className="mb-4">
            <div className={"item-view"}>
                <div className={"item-view--heading"}>
                    <h4 className="h5 mb-4 text-black">
                        {props.data.item_title}
                    </h4>
                </div>
                <div className={"item-view--body"}>
                    <div className={"item-view--body--left"}>
                        <img src={props.data.item_image_url}
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
                                    {props.data.provider}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Name:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_title}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Seller:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_seller}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Condition:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_condition}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Location:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    <span>{props.data.item_region}</span>
                                    <span>{props.data.item_city}</span>
                                    <span>{props.data.item_country}</span>
                                    <span>{props.data.item_post_code}</span>
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Discount:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    <span>{props.data.item_discount_percentage}</span>
                                    <span>{props.data.item_discount_price}</span>
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Brand:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_brand}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Color:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_color}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Return Method:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_return_method}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Refund Method:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_refund_method}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Price:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_price} {props.data.item_currency}
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className={"item-view--content"}>
                    {HtmlParser(props.data.item_description)}
                </div>

                <a href={props.data.item_href}
                   className="btn btn-primary">
                    Buy Now
                </a>
            </div>
        </div>
    );
}
export default RetailItemView;
