import React from "react";
import {wpApiConfig} from "../../config/wp-api-config";
import Header from "../../views/layout/Header";
import ReactHtmlParser from "react-html-parser";
import {filterHtml} from "../../library/html-parser";
import {ListingsContext} from "../Context/ListingsContext";
import {fetchWpData} from "../../library/api/wp/middleware";
import {isSet} from "../../library/utils";


const sprintf = require("sprintf").sprintf;

class PageComponent extends React.Component {
    static async getInitialProps(ctx) {
        return {
            props: {}
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            pageData: false
        }
        this.htmlParserOptions = {
            decodeEntities: true,
            transform: filterHtml
        };
        this.getPage = this.getPage.bind(this);
    }

    componentDidMount() {
        this.getPage();
    }

    getPage() {
        fetchWpData(wpApiConfig.endpoints.page, this.props.data.pageName).then((res) => {
            // res.json()
            // console.log(res.data)
            this.setState({
                pageData: res.data
            })
            // console.log(this.props)
            if (isSet(this.props.setPageData)) {
                this.props.setPageData(res.data)
            }

            console.log(this.props)
            if (isSet(this.props.setListingsData)) {
                // console.log(res.data.post.blocks_data.tru_fetcher_listings)
                this.props.setListingsData(res.data.post.blocks_data.tru_fetcher_listings)
                this.props.setListingsProviders(res.data.post.blocks_data.tru_fetcher_listings)
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.pageData
                    ?
                    <>
                    <Header data={this.state.pageData}/>
                    <div>
                        <h1>{this.state.pageData.post.post_title}</h1>
                        {ReactHtmlParser(this.state.pageData.post.post_content, this.htmlParserOptions)}
                    </div>
                    </>
                    :
                    <div>Loading...</div>
                }
            </div>
        )
    }
}
PageComponent.contextType = ListingsContext;
export default PageComponent;