import React, {useState} from "react";
import AuthLoginForm from "./AuthLoginForm";
import AuthGoogle from "./AuthGoogle";
import AuthFacebook from "./AuthFacebook";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {showPageModalMiddleware} from "../../../redux/middleware/page-middleware";
import SocialButton from "../Forms/Buttons/SocialButton";

const AuthLoginWrapper = (props) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showFacebook, setShowFacebook] = useState(false);
    const [showGoogle, setShowGoogle] = useState(false);
    const showLoginFormHandler = () => {
        setShowLoginForm(true)
    }

    const requestCallback = (error, data) => {
        props.showPageModalMiddleware(false);
    }

    const facebookClickHandler = () => {
        setShowFacebook(true)
    }

    const googleClickHandler = () => {
        setShowGoogle(true)
    }

    return (
        <div className={"auth-wrapper"}>
            {!showLoginForm &&
            <>
                <div className={"auth-wrapper--google auth-wrapper--button"}>
                    <AuthGoogle
                        requestCallback={requestCallback}
                        component={<SocialButton buttonClass={"google-light-red"}
                                                 iconClass={"fa-google"}
                                                 buttonLabel={"Sign in with Google"}
                        />}
                    />
                </div>
                <div className={"auth-wrapper--facebook auth-wrapper--button"}>
                    <AuthFacebook
                        requestCallback={requestCallback}
                        component={<SocialButton buttonClass={"facebook-light-blue"}
                                                 iconClass={"fa-facebook-f"}
                                                 buttonLabel={"Sign in with Facebook"}
                        />}
                    />
                </div>
                <div className={"auth-wrapper--login-form auth-wrapper--button"}>
                    <AuthLoginForm requestCallback={requestCallback}/>
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    size="large"*/}
                    {/*    color="primary"*/}
                    {/*    onClick={showLoginFormHandler}*/}
                    {/*>*/}
                    {/*    Login Form*/}
                    {/*</Button>*/}
                    {/*{showLoginForm && <AuthLoginForm requestCallback={requestCallback} />}*/}
                </div>
            </>
            }
        </div>
    )
}
export default connect(
    null,
    {
        showPageModalMiddleware
    }
)(AuthLoginWrapper);