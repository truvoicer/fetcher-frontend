import React from "react";

class ListingsFilterItem extends React.Component {
    constructor(props) {
        super(props);
        this.showControl = this.showControl.bind(this)
    }

    showControl(e) {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active")
        } else {
            e.target.classList.add("active")
        }
    }

    render() {
        return (
            <>
                <span className="opener" onClick={this.showControl}>{this.props.label}</span>
                <ul>
                    <li className={"listings-filter--item-control"}>
                        {this.props.control}
                    </li>
                </ul>
            </>
        )
    }
}

export default ListingsFilterItem;