import Modal from "react-bootstrap/Modal";
import React from "react";
import {formatDate} from "../../../../../../../library/utils";
import {fetchData, responseHandler} from "../../../../../../../library/api/fetcher/middleware";

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
                item: data.requestData[0]
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
                        <ul className={"item-info--list"}>
                            <li>
                                <div className={"item-info--list--row"}>
                                    <div className={"item-info--list--row--label"}>
                                        Event Start Date:
                                    </div>
                                    <div className={"item-info--list--row--value"}>
                                        <p>{formatDate(this.state.data.item.item_start_date)}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={"item-info--list--row"}>
                                    <div className={"item-info--list--row--label"}>
                                        Event details:
                                    </div>
                                    <div className={"item-info--list--row--value"}>
                                        <p>{this.state.data.item.item_info}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

export default EventInfoModal;