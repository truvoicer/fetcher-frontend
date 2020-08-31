import React, {useState} from "react";
import AuthLoginForm from "./AuthLoginForm";
import AuthGoogle from "./AuthGoogle";
import AuthFacebook from "./AuthFacebook";
import Button from "@material-ui/core/Button";
import AuthRegisterForm from "./AuthRegisterForm";

const AuthRegisterWrapper = (props) => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const showRegisterFormHandler = () => {
        setShowRegisterForm(true)
    }
    return (
        <div className={"auth-wrapper"}>
            {!showRegisterForm &&
            <>
                <div className={"auth-wrapper--google auth-wrapper--button"}>
                    <AuthGoogle/>
                </div>
                <div className={"auth-wrapper--facebook auth-wrapper--button"}>
                    <AuthFacebook/>
                </div>
            </>
            }
            <div className={"auth-wrapper--signup-form auth-wrapper--button"}>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={showRegisterFormHandler}
                >
                    Signup Form
                </Button>
                {showRegisterForm && <AuthRegisterForm />}
            </div>
        </div>
    )
}
export default AuthRegisterWrapper;