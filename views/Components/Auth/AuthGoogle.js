import React  from "react";
import { GoogleLogin } from 'react-google-login';
import {GoogleAuthConfig} from "../../../config/google/googleOauthConfig";
import {connect} from "react-redux";
import {getSessionTokenMiddleware} from "../../../redux/middleware/session-middleware";
import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import {wpApiConfig} from "../../../config/wp-api-config";

const AuthGoogle = (props) => {
    const responseSuccess = (response) => {
        const data = {
            custom_auth: "google",
            password: response.tokenId
        }
        props.getSessionTokenMiddleware(buildWpApiUrl(wpApiConfig.endpoints.token), data, props.requestCallback)
    }
    const responseFail = (response) => {
        console.error(response);
    }
    return (
        <GoogleLogin
            clientId={GoogleAuthConfig.client_id}
            autoLoad={false}
            buttonText="Login with Google"
            onSuccess={responseSuccess}
            onFailure={responseFail}
            cookiePolicy={'single_host_origin'}
            render={renderProps => props.component}
        />
    );
}

export default connect(
    null,
    {getSessionTokenMiddleware}
)(AuthGoogle);