import React, {Component} from 'react';
import Router from "next/router";
import {fetchData} from "../../../library/api/fetcher/middleware";
import {siteConfig} from "../../../config/site-config";
import {isSet} from "../../../library/utils";
import LoaderComponent from "./Loader";
import RightSidebar from "../Sidebars/RightSidebar";

class ItemViewWidget extends Component {
    static async getInitialProps(ctx) {
        return {
            props: {

            }
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            provider: "",
            item_id: "",
            showItem: false,
            error: false,
            itemError: ""
        }
        this.fetchItemCallback = this.fetchItemCallback.bind(this)
        this.getItemView = this.getItemView.bind(this)
    }

    componentDidMount() {
        const {category, provider, item_id} = Router.query
        console.log(Router.query)
        let data = {
            query: item_id,
            provider: provider
        }
        this.setState({
            category: category,
            provider: provider,
            item_id: item_id
        })
        fetchData("operation", ["single"], data, this.fetchItemCallback)
    }

    fetchItemCallback(status, data) {
        console.log(data)
        if (status === 200) {
            this.setState({
                showItem: true,
                error: false,
                item: data.request_data[0]

            })
        } else {
            this.setState({
                showItem: false,
                error: true,
                itemError: "Item fetch error..."
            })
        }
    }

    getItemView(item) {
        const gridConfig = siteConfig.gridItems;
        if (!isSet(gridConfig[this.state.category])) {
            return null;
        }
        if (!isSet(gridConfig[this.state.category].single)) {
            return null;
        }
        const ItemView = gridConfig[this.state.category].single;
        return <ItemView data={item} />
    }

    render() {
        return (
            <>
                {this.state.showItem
                    ?
                    <div className="site-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    {this.getItemView(this.state.item)}
                                </div>
                                <div className="col-lg-3 ml-auto">
                                    <RightSidebar/>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <LoaderComponent/>
                }
                {this.state.error && <p>{this.state.itemError}</p>}
            </>
        );
    }
}

export default ItemViewWidget;
