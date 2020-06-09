import React from "react";
import FetcherApp from "../views/App";
import Router from "next/router";

class Page extends React.Component {
    static async getInitialProps(ctx) {
        return {
            props: {}
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {
                pageName: ""
            }
        }
    }
    componentDidMount() {
        const {page} = Router.query;
        this.setState({
            data: {
                pageName: page
            }
        })
    }

    render() {
        return (
            <FetcherApp data={this.state.data}/>
        )
    }
}

export default Page;