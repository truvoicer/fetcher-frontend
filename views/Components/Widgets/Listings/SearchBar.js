import React, {Component} from 'react';
import {fetcherApiConfig} from "../../../../config/fetcher-api-config";
import {NEW_SEARCH_REQUEST} from "../../../../redux/constants/search-constants";
import {connect} from "react-redux";
import {addQueryDataObjectMiddleware} from "../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperationMiddleware} from "../../../../redux/middleware/search-middleware";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            location: "",
            category: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
    }

    componentDidMount() {

    }

    formChangeHandler(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formSubmitHandler(e) {
        e.preventDefault();
        this.props.setSearchRequestOperation(NEW_SEARCH_REQUEST);
        this.props.addQueryDataObjectMiddleware(this.state, true);
    }

    render() {
        return (
            <div className="form-search-wrap mb-3" data-aos="fade-up" data-aos-delay="200">
                <form onSubmit={this.formSubmitHandler}>
                    <div className="row align-items-center">
                        <div className="col-lg-12 mb-4 mb-xl-0 col-xl-4">
                            <input type="text"
                                   className="form-control rounded"
                                   placeholder="What are you looking for?"
                                   name={"query"}
                                   value={this.state.query}
                                   onChange={this.formChangeHandler}/>
                        </div>
                        <div className="col-lg-12 mb-4 mb-xl-0 col-xl-3">
                            <div className="wrap-icon">
                                <span className="icon icon-room"/>
                                <input type="text"
                                       className="form-control rounded"
                                       placeholder="Location"
                                       name={"location"}
                                       value={this.state.location}
                                       onChange={this.formChangeHandler}/>
                            </div>

                        </div>
                        <div className="col-lg-12 mb-4 mb-xl-0 col-xl-3">
                            <div className="select-wrap">
                                <span className="icon"><span className="icon-keyboard_arrow_down"/></span>
                                <select className="form-control rounded"
                                        name="category"
                                        defaultValue={this.state.category}
                                        onChange={this.formChangeHandler}>
                                    <option value="all">All Categories</option>
                                    <option value="real_estate">Real Estate</option>
                                    <option value="books">Books &amp;  Magazines</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="vehicles">Cars &amp; Vehicles</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-12 col-xl-2 ml-auto text-right">
                            <input type="submit" className="btn btn-primary btn-block rounded" value="Search"/>
                        </div>

                    </div>
                </form>
            </div>
        );
    }
}
export default connect(
    null,
    {addQueryDataObjectMiddleware, setSearchRequestOperation: setSearchRequestOperationMiddleware}
)(SearchBar);
