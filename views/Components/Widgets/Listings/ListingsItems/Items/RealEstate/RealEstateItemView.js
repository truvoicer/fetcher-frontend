import React, {Component} from 'react';
import TabList from "../../../../../Tabs/TabList";
import {RealEstateTabConfig} from "../../../../../../../config/tabs/item/real-estate";
import {RetailTabConfig} from "../../../../../../../config/tabs/item/retail";

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
            <div className="mb-4" style={{marginTop: "-150px"}}>
                <div className="slide-one-item home-slider owl-carousel">
                    <div>
                        <img src={this.props.data.item_default_image}
                             alt="Image"
                             className="img-fluid rounded"/>
                    </div>
                </div>
                <h4 className="h5 mb-4 text-black">
                    {this.props.data.item_property_type} {this.props.data.item_post_code}
                </h4>
                <div className={"item-info"}>
                    <div className={"item-info--tabs"}>
                        <TabList data={this.getTabConfig()} item={this.props.data}/>
                    </div>
                </div>
                <p className="mt-3">
                    <a href={this.props.data.item_url}
                       className="btn btn-primary">
                        Get In Touch
                    </a>
                </p>
            </div>
        );
    }
}

export default RealEstateItemView;
