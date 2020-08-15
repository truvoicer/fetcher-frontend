import Modal from "react-bootstrap/Modal";
import React from "react";
import {formatDate} from "../../../../../../../library/utils";
import {fetchData, responseHandler} from "../../../../../../../library/api/fetcher/middleware";

class RetailInfoModal extends React.Component {
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
                            <h3 className={"item-info--title"}>{this.state.data.item.item_title}</h3>
                            <div className={"listings-block--item--action"}>
                                <a href={this.state.data.item.item_href}
                                   className="button"
                                   target={"_blank"}>Buy</a>
                            </div>
                        </div>
                        <div className={"item-info--body"}>
                            <div className={"item-info--image"}>
                                <img src={this.state.data.item.item_image_url}/>
                            </div>
                            <ul className={"item-info--list"}>
                                <li>
                                    <div className={"item-info--list--row"}>
                                        <div className={"item-info--list--row--label"}>
                                            Description:
                                        </div>
                                        <div className={"item-info--list--row--value"}>
                                            <p>{this.state.data.item.item_description}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-info--list--row"}>
                                        <div className={"item-info--list--row--label"}>
                                            Price:
                                        </div>
                                        <div className={"item-info--list--row--value"}>
                                            <p>{this.state.data.item.item_price}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className={"item-info--list--row"}>
                                        <div className={"item-info--list--row--label"}>
                                            Currency:
                                        </div>
                                        <div className={"item-info--list--row--value"}>
                                            <p>{this.state.data.item.item_currency}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

export default RetailInfoModal;