import Modal from "react-bootstrap/Modal";
import React, {useEffect, useState} from "react";
import {fetchData} from "../../../../../../../library/api/fetcher/middleware";
import ItemViewVerticalTabList from "../../../../../Tabs/ItemViewVerticalTabList";
import {EventsTabConfig} from "../../../../../../../config/tabs/item/events";

const EventInfoModal = (props) => {
    const [data, setData] = useState({})

    useEffect(() => {
        let data = {
            query: props.data.item.item_id,
            provider: props.data.item.provider
        }
        fetchData("operation", ["single"], data, fetchItemCallback)
    })

    const fetchItemCallback = (status, data) => {
        setData(data.request_data[0])
    }

    return (
        <Modal show={props.data.show} onHide={props.close} size={"lg"}>
            <Modal.Body>
                {data.item &&
                <div className={"item-info"}>
                    <div className={"item-info--header"}>
                        <h3 className={"item-info--title"}>{data.item.item_name}</h3>
                        <div className={"listings-block--item--action"}>
                            <a href={data.item.item_links}
                               className="button"
                               target={"_blank"}>More info</a>
                        </div>
                    </div>
                    <div className={"item-info--tabs"}>
                        <ItemViewVerticalTabList data={EventsTabConfig} item={data.item}/>
                    </div>
                </div>
                }
            </Modal.Body>
        </Modal>
    )
}

export default EventInfoModal;