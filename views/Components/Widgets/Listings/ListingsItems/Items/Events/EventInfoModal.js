import Modal from "react-bootstrap/Modal";
import React from "react";
import {formatDate} from "../../../../../../../library/utils";
import {fetchData, responseHandler} from "../../../../../../../library/api/fetcher/middleware";
import ItemViewVerticalTabList from "../../../../../Tabs/ItemViewVerticalTabList";
import {EventsTabConfig} from "../../../../../../../config/tabs/item/events";

class EventInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
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
        this.setState({
            data: {
                item: data.request_data[0]
            }
        })
    }

    render() {
        return (
            <Modal show={this.props.data.show} onHide={this.props.close} size={"lg"}>
                <Modal.Body>
                    {this.state.data.item &&
                    <div className={"item-info"}>
                        <div className={"item-info--header"}>
                            <h3 className={"item-info--title"}>{this.state.data.item.item_name}</h3>
                            <div className={"listings-block--item--action"}>
                                <a href={this.state.data.item.item_links}
                                   className="button"
                                   target={"_blank"}>More info</a>
                            </div>
                        </div>
                        <div className={"item-info--tabs"}>
                            <ItemViewVerticalTabList data={EventsTabConfig} item={this.state.data.item}/>
                        </div>
                    </div>
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

export default EventInfoModal;