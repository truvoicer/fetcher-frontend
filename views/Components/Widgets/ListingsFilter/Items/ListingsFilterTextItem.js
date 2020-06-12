import React from "react";

class ListingsFilterTextItem extends React.Component {
    constructor(props) {
        super(props);
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }

    formChangeHandler(e) {
        let data = {
            name: e.target.name,
            value: e.target.value
        };
        this.props.onChangeCallback(data)
    }
    render() {
        return (
            <>
                <ul>
                    <li className={"listings-filter--item-control"}>
                        <input type={"text"}
                               name={this.props.data.name}
                               value={this.props.value && this.props.value[this.props.data.name]}
                               onChange={this.formChangeHandler}/>
                    </li>
                </ul>
            </>
        )
    }
}

export default ListingsFilterTextItem;