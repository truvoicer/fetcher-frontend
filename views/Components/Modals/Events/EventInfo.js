import Modal from "react-bootstrap/Modal";
import React from "react";
import {formatDate} from "../../../../library/utils";
import {fetchData, responseHandler} from "../../../../library/api/fetcher/middleware";

class EventInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
        this.fetchItemCallback = this.fetchItemCallback.bind(this)
    }

    componentDidMount() {
        let data = {
            id: this.props.data.item.event_id,
            provider: this.props.data.provider
        }
        console.log(this.props.data)
        fetchData("operation", ["get"], data, this.fetchItemCallback)
    }

    fetchItemCallback(status, data) {
        console.log(status, data)

        this.setState({
            data: {
                item: data.item
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
                            <h3 className={"item-info--title"}>{this.state.data.item.event_name}</h3>
                            <div className={"listings-block--item--action"}>
                                <a href={this.state.data.item.event_links}
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
                                        <p>{formatDate(this.state.data.item.event_start_date)}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={"item-info--list--row"}>
                                    <div className={"item-info--list--row--label"}>
                                        Event details:
                                    </div>
                                    <div className={"item-info--list--row--value"}>
                                        <p>{this.state.data.item.event_info}</p>
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

export default EventInfo;