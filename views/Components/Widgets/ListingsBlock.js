import React from "react";
import {ListingsContext} from "../../Context/ListingsContext";
import {buildFetcherApiUrl, fetchData, fetchSearchData} from "../../../library/api/fetcher/middleware";
import {getToken, isAuthenticated, setSession} from "../../../library/api/fetcher/session/authenticate";
import {isSet} from "../../../library/utils";
import {getDefaultImage, runSearch} from "../../../library/api/fetcher/search";


class ListingsBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        console.log(this.context.listingsSearchResults)
        return (
            <div className={"listings-block"}>
                {this.context.listingsSearchResults.length > 0 ?

                    <div className="posts">
                        {this.context.listingsSearchResults.map((item, index) => (
                            <article key={index}>
                                <a href="#" className="image">
                                    <img className={"default-image"} src={getDefaultImage(item)} />
                                </a>
                                <h3>{item.event_name}</h3>
                                <p>{item.event_info}</p>
                                <ul className="actions">
                                    <li><a href={item.event_links} className="button">More</a></li>
                                </ul>
                            </article>
                    ))}
                    </div>
                    :
                    <p>loading</p>
                }
            </div>
        )
    }
}
ListingsBlock.contextType = ListingsContext;
export default ListingsBlock;