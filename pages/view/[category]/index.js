import React, {Component} from 'react';
import Router from "next/router";

class ProviderCategoryPage extends Component {
    static async getInitialProps(ctx) {
        return {
            props: {

            }
        }
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {category} = Router.query
        console.log(Router.query)
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default ProviderCategoryPage;
