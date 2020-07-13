import ListingsFilterTextItem from "./Widgets/ListingsFilter/Items/ListingsFilterTextItem";
import React from "react";
import {ListingsContext} from "../Context/ListingsContext";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formClickHandler = this.formClickHandler.bind(this);
    }

    formClickHandler(e) {
        e.preventDefault();
        let keywords = document.getElementById("keywords");
        let listingsQueryData = this.context.listingsQueryData;
        listingsQueryData["keywords"] = keywords.value;
        this.context.setListingsQueryData(listingsQueryData);
    }

    formChangeHandler(e) {
        this.setState({
            keywords: e.target.value
        })
    }

    render() {
        return (
            <section id="search" className="alt">
                <form method="post" onSubmit={this.formClickHandler}>
                        <input type="text" name="keywords"
                               id="keywords"
                               placeholder="Search"
                               value={this.state.keywords}
                               onChange={this.formChangeHandler}/>
                    <span className={"search-icon"} onClick={this.formClickHandler}/>
                </form>
            </section>
        )
    }
}

Search.contextType = ListingsContext;
export default Search;