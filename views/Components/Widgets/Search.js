import ListingsFilterTextItem from "./Listings/ListingsFilter/Items/ListingsFilterTextItem";
import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";
import {connect} from "react-redux";
import {addListingsQueryDataString} from "../../../redux/middleware/listings-middleware";
import {setSearchRequestOperation} from "../../../redux/middleware/search-middleware";
import {fetcherApiConfig} from "../../../config/fetcher-api-config";
import {NEW_SEARCH_REQUEST} from "../../../redux/constants/search-constants";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            [fetcherApiConfig.queryKey]: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formClickHandler = this.formClickHandler.bind(this);
    }

    formClickHandler(e) {
        e.preventDefault();
        this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        this.props.addListingsQueryDataString(fetcherApiConfig.queryKey, this.state[fetcherApiConfig.queryKey], true)
    }

    formChangeHandler(e) {
        this.setState({
            [fetcherApiConfig.queryKey]: e.target.value
        })
    }

    render() {
        return (
            <section id="search" className="alt">
                <form method="post" onSubmit={this.formClickHandler}>
                        <input type="text"
                               placeholder="Search"
                               value={this.state[fetcherApiConfig.queryKey]}
                               onChange={this.formChangeHandler}/>
                    <span className={"search-icon"} onClick={this.formClickHandler}/>
                </form>
            </section>
        )
    }
}

export default connect(
    null,
    {addListingsQueryDataString, setSearchRequestOperation}
)(Search);