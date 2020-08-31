import React  from "react";
import { GoogleLogin } from 'react-google-login';
import {GoogleAuthConfig} from "../../../config/google/googleOauthConfig";

const AuthGoogle = (props) => {
    const responseSuccess = (response) => {
        let data = {
            tokenId: response.tokenId,
            familyName: response.profileObj.familyName,
            givenName: response.profileObj.givenName,
            googleId: response.profileObj.googleId,
            imageUrl: response.profileObj.imageUrl,
            fullName: response.profileObj.name
        }
        console.log(response);
    }
    const responseFail = (response) => {
        console.log(response);
    }
    return (
        <GoogleLogin
            clientId={GoogleAuthConfig.client_id}
            buttonText="Login with Google"
            onSuccess={responseSuccess}
            onFailure={responseFail}
            cookiePolicy={'single_host_origin'}
        />
    );
}
export default AuthGoogle;