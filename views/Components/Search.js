import ListingsFilterTextItem from "./Widgets/ListingsFilter/Items/ListingsFilterTextItem";
import React from "react";
import {ListingsContext} from "../Context/ListingsContext";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../redux/actions/listings-actions";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formClickHandler = this.formClickHandler.bind(this);
    }

    formClickHandler(e) {
        e.preventDefault();
        this.props.addListingsQueryDataString("query", this.state.query, true)
    }

    formChangeHandler(e) {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <section id="search" className="alt">
                <form method="post" onSubmit={this.formClickHandler}>
                        <input type="text" name="query"
                               id="query"
                               placeholder="Search"
                               value={this.state.query}
                               onChange={this.formChangeHandler}/>
                    <span className={"search-icon"} onClick={this.formClickHandler}/>
                </form>
            </section>
        )
    }
}

export default connect(
    null,
    {addListingsQueryDataString}
)(Search);