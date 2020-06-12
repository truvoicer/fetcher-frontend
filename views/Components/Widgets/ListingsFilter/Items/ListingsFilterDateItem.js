import React from "react";
import DatePicker from "react-datepicker";

class ListingsFilterDateItem extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            startDate: date,
            dateString: date.toLocaleString()
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(date) {
        this.setState({
            startDate: date,
        });

        let data = {
            name: this.props.data.name,
            value: date.toLocaleString()
        };
        this.props.onChangeCallback(data)
    };

    render() {
        return (
            <>
                <ul>
                    <li className={"listings-filter--item-control"}>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                    </li>
                </ul>
            </>
        )
    }
}

export default ListingsFilterDateItem;