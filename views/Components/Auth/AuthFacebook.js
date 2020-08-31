import React, {useEffect} from "react";
import FacebookLogin from 'react-facebook-login';
import {facebookAuthConfig} from "../../../config/facebook/facebookAuthConfig";

const AuthFacebook = (props) => {
    const responseFacebook = (response) => {
        console.log(response);
    }
    const componentClicked = (e) => {
        console.log(e)
    }
    return (
        <FacebookLogin
            appId={facebookAuthConfig.appId}
            autoLoad={false}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            textButton={"Login with Facebook"}
            size={"small"}
        />
    )
}
export default AuthFacebook;