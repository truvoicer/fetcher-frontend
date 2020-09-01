import React, {useState} from "react";
import AuthLoginForm from "./AuthLoginForm";
import AuthGoogle from "./AuthGoogle";
import AuthFacebook from "./AuthFacebook";
import Button from "@material-ui/core/Button";
import AuthRegisterForm from "./AuthRegisterForm";
import {connect} from "react-redux";
import {showPageModalMiddleware} from "../../../redux/middleware/page-middleware";
import SocialButton from "../Forms/Buttons/SocialButton";

const AuthRegisterWrapper = (props) => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const showRegisterFormHandler = () => {
        setShowRegisterForm(true)
    }

    const requestCallback = (error, data) => {
        props.showPageModalMiddleware(false);
    }

    return (
        <div className={"auth-wrapper"}>
            {!showRegisterForm &&
            <>
                <div className={"auth-wrapper--google auth-wrapper--button"}>
                    <AuthGoogle
                        requestCallback={requestCallback}
                        component={<SocialButton buttonClass={"google-light-red"}
                                                 iconClass={"fa-google"}
                                                 buttonLabel={"Sign up with Google"}
                        />}
                    />
                </div>
                <div className={"auth-wrapper--facebook auth-wrapper--button"}>
                    <AuthFacebook
                        requestCallback={requestCallback}
                        component={<SocialButton buttonClass={"facebook-light-blue"}
                                                 iconClass={"fa-facebook-f"}
                                                 buttonLabel={"Sign up with Facebook"}
                        />}
                    />
                </div>
                <div className={"auth-wrapper--signup-form auth-wrapper--button"}>
                    <AuthRegisterForm requestCallback={requestCallback} />
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    size="large"*/}
                    {/*    color="primary"*/}
                    {/*    onClick={showRegisterFormHandler}*/}
                    {/*>*/}
                    {/*    Signup Form*/}
                    {/*</Button>*/}
                    {/*{showRegisterForm && <AuthRegisterForm requestCallback={requestCallback} />}*/}
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
)(AuthRegisterWrapper);