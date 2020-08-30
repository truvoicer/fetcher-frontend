import React from "react";
import ReactHtmlParser from "react-html-parser";
import {filterHtml} from "../../library/html-parser";
import Head from "next/head";
import {connect} from "react-redux";
import {getPageDataMiddleware} from "../../redux/middleware/page-middleware";
import HeroBlock from "../Components/HeroBlock";

const htmlParserOptions = {
    decodeEntities: true,
    transform: filterHtml
}

const SiteComponent = (props) => {
    return (
            <>
                {props.pageData
                    ?
                    <>
                        <Head>
                            <title>{props.pageData.seo_title ? props.pageData.seo_title : "Loading.."}</title>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                        </Head>
                        <HeroBlock />
                        {ReactHtmlParser(props.pageData.post_content, htmlParserOptions)}
                    </>
                    :
                    <div>Loading...</div>
                }
            </>
        )
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
    {getPageDataMiddleware}
)(SiteComponent);