import React, {useState} from "react";
import AuthLoginForm from "./AuthLoginForm";
import AuthGoogle from "./AuthGoogle";
import AuthFacebook from "./AuthFacebook";
import Button from "@material-ui/core/Button";

const AuthLoginWrapper = (props) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const showLoginFormHandler = () => {
        setShowLoginForm(true)
    }
    return (
        <div className={"auth-wrapper"}>
            {!showLoginForm &&
            <>
                <div className={"auth-wrapper--google auth-wrapper--button"}>
                    <AuthGoogle/>
                </div>
                <div className={"auth-wrapper--facebook auth-wrapper--button"}>
                    <AuthFacebook/>
                </div>
            </>
            }
            <div className={"auth-wrapper--login-form auth-wrapper--button"}>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={showLoginFormHandler}
                >
                    Login Form
                </Button>
                {showLoginForm && <AuthLoginForm/>}
            </div>
        </div>
    )
}
export default AuthLoginWrapper;