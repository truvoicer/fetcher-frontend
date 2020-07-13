import Sidebar from "./layout/Sidebar";
import PageComponent from "./Components/Page";
import {ListingsContext} from "./Context/ListingsContext";
import {PageContext} from "./Context/PageContext";
import {SiteContext} from "./Context/SiteContext";
import {fetchWpData, fetchWpSiteData} from "../library/api/wp/middleware";
import {AddAxiosInterceptors} from "../library/api/global-scripts"
import {fetchData, isEmpty, responseHandler} from "../library/api/fetcher/middleware";
import {runSearch} from "../library/api/fetcher/search";

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
        this.getProvidersCallback = this.getProvidersCallback.bind(this)
        this.setSiteData = this.setSiteData.bind(this)
    }

    componentDidMount() {
        AddAxiosInterceptors();
        this.setState({
            listings: {
                listingsData: {},
                listingsQueryData: {},
                listingsSearchResults: [],
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
            let category = data.listing_block_category.slug;
            fetchData("list", [category, "providers"], {}, this.getProvidersCallback);
        }
    }
    getProvidersCallback(status, data) {
        let listingsData = this.state.listings.listingsData;
        listingsData.providers = data.data;
        this.setListingsData(listingsData)
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
                listingsSearchResults: [],
                setListingsData: this.setListingsData,
                setListingsProviders: this.setListingsProviders,
                setListingsQueryData: this.setListingsQueryData
            }
        }));
        runSearch(this.setListingsSearchResults, this.state.listings)
    }

    setListingsSearchResults(status, data) {
        let listItems = [];
        if (this.state.listings.listingsSearchResults.length === 0) {
            listItems = data.listItems;
        } else if (this.state.listings.listingsSearchResults.length > 0) {
            listItems = this.state.listings.listingsSearchResults;
            for (let i=0;i<data.listItems.length;i++) {
                listItems.push(data.listItems[i]);
            }
        }
        this.setState(state => ({
            listings: {
                listingsData: this.state.listings.listingsData,
                listingsQueryData: this.state.listings.listingsQueryData,
                listingsSearchResults: listItems,
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
                            <div id="main">
                                <div className="inner">
                                    <PageComponent data={this.props.data} setPageData={this.setPageData}
                                                   setListingsData={this.setListingsData} setListingsProviders={this.setListingsProviders}/>
                                </div>
                            </div>
                            <Sidebar listingsData={this.state.listings.listingsData}/>
                        </div>
                    </ListingsContext.Provider>
                </PageContext.Provider>
            </SiteContext.Provider>
        )
    }
}

export default FetcherApp;