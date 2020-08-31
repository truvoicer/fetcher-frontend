import React, {useState} from 'react';
import {NEW_SEARCH_REQUEST} from "../../../../redux/constants/search-constants";
import {connect} from "react-redux";
import {addQueryDataObjectMiddleware} from "../../../../redux/middleware/listings-middleware";
import {setSearchRequestOperationMiddleware} from "../../../../redux/middleware/search-middleware";
import {fetcherApiConfig} from "../../../../config/fetcher-api-config";

const SearchBar = (props) => {
    const [query, setQuery] = useState("")
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")
    const [searchData, setSearchData] = useState({})

    const formChangeHandler = (e) => {
        e.preventDefault();

        let getSearchData = {...searchData};
        switch (e.target.name) {
            case "query":
                setQuery(e.target.value)
                getSearchData[fetcherApiConfig.queryKey] = e.target.value;
                break;
            case "category":
                setCategory(e.target.value)
                getSearchData.category = e.target.value;
                break;
            case "location":
                setLocation(e.target.value)
                getSearchData.location = e.target.value;
                break;
            default:
                return false;
        }
        setSearchData(getSearchData)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        props.setSearchRequestOperationMiddleware(NEW_SEARCH_REQUEST);
        props.addQueryDataObjectMiddleware(searchData, true);
    }

    return (
        <div className="form-search-wrap mb-3" data-aos="fade-up" data-aos-delay="200">
            <form onSubmit={formSubmitHandler}>
                <div className="row align-items-center">
                    <div className="col-lg-12 mb-4 mb-xl-0 col-xl-4">
                        <input type="text"
                               className="form-control rounded"
                               placeholder="What are you looking for?"
                               name={"query"}
                               value={query}
                               onChange={formChangeHandler}/>
                    </div>
                    <div className="col-lg-12 mb-4 mb-xl-0 col-xl-3">
                        <div className="wrap-icon">
                            <span className="icon icon-room"/>
                            <input type="text"
                                   className="form-control rounded"
                                   placeholder="Location"
                                   name={"location"}
                                   value={location}
                                   onChange={formChangeHandler}/>
                        </div>

                    </div>
                    <div className="col-lg-12 mb-4 mb-xl-0 col-xl-3">
                        <div className="select-wrap">
                            <span className="icon"><span className="icon-keyboard_arrow_down"/></span>
                            <select className="form-control rounded"
                                    name="category"
                                    defaultValue={category}
                                    onChange={formChangeHandler}>
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
export default connect(
    null,
    {
        addQueryDataObjectMiddleware,
        setSearchRequestOperationMiddleware
    }
)(SearchBar);
