import React from "react";
import FetcherApp from "../../views/App";
import useSwr from 'swr'
import {wpApiConfig} from "../../config/wp-api-config";
import Router from "next/router";
import Header from "../../views/layout/Header";
import ReactHtmlParser from "react-html-parser";
import {filterHtml} from "../../library/html-parser";

const sprintf = require("sprintf").sprintf;

const fetcher = (url) => fetch(url).then((res) => res.json())

class PageComponent extends React.Component {
    static async getInitialProps(ctx) {
        return {
            props: {}
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            pageData: ""
        }
        this.page = "";
        this.htmlParserOptions = {
            decodeEntities: true,
            transform: filterHtml
        };
        this.getPage = this.getPage.bind(this);
    }

    componentDidMount() {
        const {page} = Router.query;
        this.page = page;
    }

    getPage() {
        const endpoint = sprintf(wpApiConfig.apiBaseUrl + wpApiConfig.endpoints.page, this.props.data.pageName);
        const {data, error} = useSwr(endpoint, fetcher)

        if (error) return <div>Failed to load user</div>
        if (!data) return <div>Loading...</div>
        return (
            <div>
                <Header data={data}/>
                <div>
                    <h1>{data.post.post_title}</h1>
                    { ReactHtmlParser(data.post.post_content, this.htmlParserOptions) }
                </div>
            </div>
        )
    }

    render() {
        return (
                <this.getPage/>
        )
    }
}

export default PageComponent;