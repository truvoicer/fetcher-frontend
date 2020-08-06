import React from "react";
import ReactHtmlParser from "react-html-parser";
import {filterHtml} from "../../../library/html-parser";
import {ListingsContext} from "../../Context/ListingsContext";
import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import Head from "next/head";
import {connect} from "react-redux";
import {getPageData} from "../../../redux/middleware/page-middleware";

class SiteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.htmlParserOptions = {
            decodeEntities: true,
            transform: filterHtml
        };
    }

    render() {
        return (
            <>
                {this.props.pageData
                    ?
                    <>
                        <Head>
                            <title>{this.props.pageData.seo_title ? this.props.pageData.seo_title : "Loading.."}</title>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                        </Head>

                        <h1>{this.props.pageData.post_title}</h1>
                        {ReactHtmlParser(this.props.pageData.post_content, this.htmlParserOptions)}
                    </>
                    :
                    <div>Loading...</div>
                }
            </>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return {
        pageName: state.page.pageName,
        pageData: state.page.post
    };
}

export default connect(
    mapStateToProps,
    {getPageData}
)(SiteComponent);