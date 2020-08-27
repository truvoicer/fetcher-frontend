import Modal from "react-bootstrap/Modal";
import React from "react";
import {fetchData, responseHandler} from "../../../../../../../library/api/fetcher/middleware";
import ItemViewVerticalTabList from "../../../../../Tabs/ItemViewVerticalTabList";
import {RealEstateTabConfig} from "../../../../../../../config/tabs/item/real-estate";

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
                            <ItemViewVerticalTabList data={RealEstateTabConfig} item={this.state.data.item}/>
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