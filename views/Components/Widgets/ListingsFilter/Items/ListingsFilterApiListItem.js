import React from "react";
import Form from "react-bootstrap/Form";

class ListingsFilterApiListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }

    formChangeHandler(e) {
        let list = this.state.listItems;
        if (e.target.checked) {
            list.push(e.target.value)
        } else {
            let index = list.indexOf(e.target.value);
            if (index !== -1) list.splice(index, 1);
        }
        this.setState({
            listItems: list
        })
        let data = {
            name: e.target.name,
            value: list
        };
        this.props.onChangeCallback(data)
    }
    render() {
        return (
            <>
                <ul>
                    {this.props.data.list.map((item, index) => (
                        <li className={"listings-filter--item-control"} key={"list_control_"+index.toString()}>
                            <Form.Check
                                type={"checkbox"}
                                label={item.label}
                                id={this.props.controlPrefix+item.name}
                                name={this.props.data.name+"[]"}
                                value={item.name}
                                onChange={this.formChangeHandler}
                            />
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}

export default ListingsFilterApiListItem;