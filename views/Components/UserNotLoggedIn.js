import React, {Component} from 'react';
import {siteConfig} from "../../config/site-config";
import Link from "next/link"

class UserNotLoggedIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={"user-not-logged-in"}>
                    <h2>You are not logged in</h2>
                    <Link
                        href={siteConfig.defaultLoginHref}
                        as={siteConfig.defaultLoginHref}
                    >
                    <a className={"btn btn-lg btn-primary"} >Login</a>
                    </Link>
                </div>
            </div>
        );
    }
}

export default UserNotLoggedIn;
