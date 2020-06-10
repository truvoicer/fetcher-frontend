import Sidebar from "./layout/Sidebar";
import PageComponent from "./Components/Page";
import {ListingsContext} from "./Context/ListingsContext";
import {PageContext} from "./Context/PageContext";
import {SiteContext} from "./Context/SiteContext";
import {fetchWpData, fetchWpSiteData} from "../library/api/middleware";
import Head from "next/head";

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
        this.setSiteData = this.setSiteData.bind(this)
    }

    componentDidMount() {
        this.setState({
            listings: {
                listingsData: {},
                listingsQueryData: {},
                setListingsData: this.setListingsData,
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

    setListingsData(data) {
        // console.log(data)
        this.setState(state => ({
            listings: {
                listingsData: data,
                listingsQueryData: this.state.listings.listingsQueryData,
                setListingsData: this.setListingsData,
                setListingsQueryData: this.setListingsQueryData
            }
        }));
    }
    setListingsQueryData(data) {
        // console.log(data)
        this.setState(state => ({
            listings: {
                listingsData: this.state.listings.listingsData,
                listingsQueryData: data,
                setListingsData: this.setListingsData,
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
                                                   setListingsData={this.setListingsData}/>
                                </div>
                            </div>
                            <Sidebar/>
                        </div>
                    </ListingsContext.Provider>
                </PageContext.Provider>
            </SiteContext.Provider>
        )
    }
}

export default FetcherApp;