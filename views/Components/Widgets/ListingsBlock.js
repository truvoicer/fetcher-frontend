import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";

class ListingsBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.context)
        return (
            <div>
                <p>LISTING BLOCK</p>
            </div>
        )
    }
}
ListingsBlock.contextType = ListingsContext;
export default ListingsBlock;