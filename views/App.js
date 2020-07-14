import Sidebar from "./layout/Sidebar";
import PageComponent from "./Components/Page";
import {ListingsContext} from "./Context/ListingsContext";
import {PageContext} from "./Context/PageContext";
import {SiteContext} from "./Context/SiteContext";
import {fetchWpData, fetchWpSiteData} from "../library/api/wp/middleware";
import {AddAxiosInterceptors} from "../library/api/global-scripts"
import {fetchData, isEmpty, responseHandler} from "../library/api/fetcher/middleware";
import {runSearch} from "../library/api/fetcher/search";
import {isSet} from "../library/utils";

class FetcherApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: {},
            page: {},
            site: {
                siteData: {}
            }
        }
        this.setPageData = this.setPageData.bind(this)
        this.setListingsData = this.setListingsData.bind(this)
        this.setListingsQueryData = this.setListingsQueryData.bind(this)
        this.setListingsProviders = this.setListingsProviders.bind(this)
        this.setListingsSearchResults = this.setListingsSearchResults.bind(this)
        this.initialSearch = this.initialSearch.bind(this)
        this.getProvidersCallback = this.getProvidersCallback.bind(this)
        this.setSiteData = this.setSiteData.bind(this)
    }

    componentDidMount() {
        AddAxiosInterceptors();
        this.setState({
            listings: {
                listingsData: {},
                listingsQueryData: {},
                listingsSearchResults: {},
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setlistingsQueryData: this.setListingsQueryData
            },
            page: {
                pageData: {},
                setPageData: this.setPageData,
            }
        })
        this.setSiteData();
    }

    setSiteData() {
        fetchWpSiteData().then((response) => {
            this.setState({
                site: {
                    siteData: {
                        name: response.data.name,
                        description: response.data.description,
                        siteUrl: response.data.url,
                        homeUrl: response.data.home,
                        gmtOffset: response.data.gm_offset,
                        timezoneString: response.data.timezone_string
                    }
                }
            })
        })
    }

    setPageData(data) {
        this.setState(state => ({
            page: {
                pageData: data,
                setPageData: this.setPageData
            }
        }));
    }

    setListingsProviders(data) {
        if (!isEmpty(data)) {
            let category = data.listing_block_category;
            fetchData("list", [category, "providers"], {}, this.getProvidersCallback);
        }
    }
    getProvidersCallback(status, data) {
        let listingsData = this.state.listings.listingsData;
        listingsData.providers = data.data;
        this.setListingsData(listingsData)
        this.initialSearch()
    }

    setListingsData(data) {
        this.setState(state => ({
            listings: {
                listingsData: data,
                listingsQueryData: this.state.listings.listingsQueryData,
                listingsSearchResults: this.state.listings.listingsSearchResults,
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setListingsQueryData: this.setListingsQueryData
            }
        }));
    }
    setListingsQueryData(data) {
        this.setState(state => ({
            listings: {
                listingsData: this.state.listings.listingsData,
                listingsQueryData: data,
                listingsSearchResults: {},
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setListingsQueryData: this.setListingsQueryData
            }
        }));
        runSearch(this.setListingsSearchResults, this.state.listings)
    }

    initialSearch() {
        if (!isSet(this.state.listings.listingsData.block_options)) {
            return false;
        }
        if (!isSet(this.state.listings.listingsData.block_options.initial_search)) {
            return false;
        }
        let initialSearch = this.state.listings.listingsData.block_options.initial_search;
        if (!isSet(initialSearch.search_type || !isSet(initialSearch.search_value))) {
            return false;
        }
        let queryData = {};
        if (initialSearch.search_type === "keywords") {
            queryData.keywords = initialSearch.search_value;
        } else if (initialSearch.search_type === "location") {
            queryData.location = initialSearch.search_value;
        }
        // console.log(queryData);
        this.setListingsQueryData(queryData)
    }

    setListingsSearchResults(status, data) {
        let listItems = [];
        if (!isSet(this.state.listings.listingsSearchResults.listItems) ||
            this.state.listings.listingsSearchResults.listItems.length === 0
        ) {
            listItems = data.listItems;
        } else if (this.state.listings.listingsSearchResults.listItems.length > 0) {
            listItems = this.state.listings.listingsSearchResults.listItems;
            for (let i=0;i<data.listItems.length;i++) {
                listItems.push(data.listItems[i]);
            }
        }
        this.setState(state => ({
            listings: {
                listingsData: this.state.listings.listingsData,
                listingsQueryData: this.state.listings.listingsQueryData,
                listingsSearchResults: {
                    listData: data.listData,
                    listItems: listItems,
                    requestService: data.requestService,
                    provider: data.provider
                },
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setListingsQueryData: this.setListingsQueryData
            }
        }));
    }

    render() {
        return (
            <SiteContext.Provider value={this.state.site}>
                <PageContext.Provider value={this.state.page}>
                    <ListingsContext.Provider value={this.state.listings}>

                        <div id="wrapper">
                            <Sidebar listingsData={this.state.listings.listingsData}/>
                            <div id="main">
                                    <PageComponent data={this.props.data} setPageData={this.setPageData}
                                                   setListingsData={this.setListingsData} setListingsProviders={this.setListingsProviders}/>
                            </div>
                        </div>
                    </ListingsContext.Provider>
                </PageContext.Provider>
            </SiteContext.Provider>
        )
    }
}

export default FetcherApp;