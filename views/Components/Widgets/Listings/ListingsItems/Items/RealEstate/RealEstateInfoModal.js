import Modal from "react-bootstrap/Modal";
import React, {useEffect, useState} from "react";
import {fetchData} from "../../../../../../../library/api/fetcher/middleware";
import ItemViewVerticalTabList from "../../../../../Tabs/ItemViewVerticalTabList";
import {RealEstateTabConfig} from "../../../../../../../config/tabs/item/real-estate";

const RealEstateInfoModal = (props) => {
    const [data, setData] = useState({
        showItem: false,
        itemError: "",
        item: {}
    });
    useEffect(() => {
        const fetchItemCallback = (status, data) => {
            console.log(status, data)
            if (status === 200) {
                setData({
                    showItem: true,
                    item: data.requestData[0],
                    itemError: ""
                })
            } else {
                setData({
                    showItem: false,
                    itemError: "Item fetch error...",
                    item: {}
                })
            }
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
                {data.item && data.showItem &&
                <div className={"item-info"}>
                    <div className={"item-info--header"}>
                        <h3 className={"item-info--title"}>
                            {data.item.item_property_type} {data.item.item_post_code}
                        </h3>
                        <a href={data.item.item_url}
                           className="btn btn-outline-secondary btn-md">
                            View
                        </a>
                    </div>
                    <div className={"item-info--tabs"}>
                        <ItemViewVerticalTabList data={RealEstateTabConfig} item={data.item}/>
                    </div>
                </div>
                }
                {!data.showItem && <div>{data.itemError}</div>}
            </Modal.Body>
        </Modal>
    )
}
export default RealEstateInfoModal;