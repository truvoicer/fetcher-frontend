import React from "react";
import FetcherApp from "../views/App";
import {connect, Provider} from "react-redux";
import {buildWpApiUrl} from "../library/api/wp/middleware";
import {wpApiConfig} from "../config/wp-api-config";
import {getPageDataMiddleware} from "../redux/middleware/page-middleware";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPageDataMiddleware(buildWpApiUrl(wpApiConfig.endpoints.page), {page: "home"});
    }

    render() {
        return (
            <FetcherApp />
        )
    }
}
export default connect(
    null,
    {getPageDataMiddleware}
)(Home);