import React from 'react';
import {EventsTabConfig} from "../../../../../../../config/tabs/item/events";
import {getDefaultImage} from "../../../../../../../library/utils";

const EventItemView = (props) => {

    const getTabConfig = () => {
        let tabConfig = EventsTabConfig;
        // tabConfig.config.initialTab = 1
        return tabConfig;
    }

    return (
        <div className="mb-4">
            <div className={"item-view"}>
                <div className={"item-view--heading"}>
                    <h4 className="h5 mb-4 text-black">
                        {props.data.item_name}
                    </h4>
                </div>
                <div className={"item-view--body"}>
                    <div className={"item-view--body--left"}>
                        <img src={getDefaultImage(props.data)}
                             alt="Image"
                             className="img-fluid rounded"/>
                    </div>
                    <div className={"item-view--body--right"}>
                        <ul className={"item-view--info-list"}>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Event Name:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_name}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Event Start Date:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_start_date}
                                    {/*{formatDate(props.data.item_start_date)}*/}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Event End Date:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_stop_date}
                                    {/*{formatDate(props.data.item_stop_date)}*/}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Event Location:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_location}
                                    {props.data.item_city}
                                    {props.data.item_country}
                                    {props.data.item_country_abbr}
                                </div>
                            </li>
                            <li>
                                <div className={"item-view--info-list--label"}>
                                    Event Price:
                                </div>
                                <div className={"item-view--info-list--value"}>
                                    {props.data.item_price}
                                </div>
                            </li>
                        </ul>
                        <h3>Event Description:</h3>
                        <p>{props.data.item_info}</p>

                        <a href={props.data.item_links}
                           className="btn btn-primary">
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventItemView;
