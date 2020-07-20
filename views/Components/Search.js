import ListingsFilterTextItem from "./Widgets/ListingsFilter/Items/ListingsFilterTextItem";
import React from "react";
import {ListingsContext} from "../Context/ListingsContext";

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
        let keywords = document.getElementById("keywords");
        let listingsQueryData = this.context.listingsQueryData;
        listingsQueryData["query"] = this.state.query;
        this.context.setListingsQueryData(listingsQueryData);
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

Search.contextType = ListingsContext;
export default Search;