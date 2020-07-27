import React from "react";
import {wpApiConfig} from "../../../config/wp-api-config";
import Header from "../Sidebars/Header";
import ReactHtmlParser from "react-html-parser";
import {filterHtml} from "../../../library/html-parser";
import {ListingsContext} from "../../Context/ListingsContext";
import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import Head from "next/head";
import {connect} from "react-redux";
import {getPageData} from "../../../redux/middleware/page-middleware";

class PageComponent extends React.Component {
    constructor(props) {
        super(props);
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
        this.props.getPageData(buildWpApiUrl(wpApiConfig.endpoints.page, this.props.data.pageName));
    }

    render() {
        return (
            <div id={"page-content"}>
                {this.props.pageData
                    ?
                    <>
                        <Head>
                            <title>{this.props.pageData.seo_title? this.props.pageData.seo_title : "Loading.."}</title>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                        </Head>
                    <Header data={this.props.pageData}/>

                        <h1>{this.props.pageData.post_title}</h1>
                        {ReactHtmlParser(this.props.pageData.post_content, this.htmlParserOptions)}
                    </>
                    :
                    <div>Loading...</div>
                }
            </div>
        )
    }
}
PageComponent.contextType = ListingsContext;
function mapStateToProps(state) {
    // console.log(state)
    return {
        pageData: state.page.post
    };
}
const Page = connect(
    mapStateToProps,
    {getPageData}
)(PageComponent);

export default Page;