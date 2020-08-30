import Modal from "react-bootstrap/Modal";
import React, {useEffect, useState} from "react";
import {fetchData} from "../../../../../../../library/api/fetcher/middleware";
import ItemViewVerticalTabList from "../../../../../Tabs/ItemViewVerticalTabList";
import {RetailTabConfig} from "../../../../../../../config/tabs/item/retail";

const RetailInfoModal = (props) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchItemCallback = (status, data) => {
            setData(data.requestData[0])
        }
        let requestData = {
            query: props.data.item.item_id,
            provider: props.data.item.provider
        }
        fetchData("operation", ["single"], requestData, fetchItemCallback)
    })

    return (
        <Modal show={props.data.show} onHide={props.close} size={"lg"}>
            <Modal.Body>
                {data.item &&
                <div className={"item-info"}>
                    <div className={"item-info--header"}>
                        <h3 className={"item-info--title"}>{data.item.item_title}</h3>
                        <div className={"listings-block--item--action"}>
                            <a href={data.item.item_href}
                               className="button"
                               target={"_blank"}>Buy</a>
                        </div>
                    </div>
                    <div className={"item-info--tabs"}>
                        <ItemViewVerticalTabList data={RetailTabConfig} item={data.item}/>
                    </div>
                </div>
                }
            </Modal.Body>
        </Modal>
    )
}

export default RetailInfoModal;