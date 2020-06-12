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
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        let listingsQueryData = this.context.listingsQueryData;
        listingsQueryData[e.target.name] = e.target.value;
        this.context.setListingsQueryData(listingsQueryData);
    }

    render() {
        return (
            <section id="search" className="alt">
                <form method="post" action="#">
                    <input type="text" name="keywords"
                           id="keywords"
                           placeholder="Search"
                           value={this.state.keywords}
                           onChange={this.formChangeHandler}/>
                </form>
            </section>
        )
    }
}
Search.contextType = ListingsContext;
export default Search;