import React, {useState} from 'react';
import {connect} from "react-redux";
import {getSessionTokenMiddleware} from "../../../redux/middleware/session-middleware";
import {buildWpApiUrl} from "../../../library/api/wp/middleware";
import {wpApiConfig} from "../../../config/wp-api-config";
import {siteConfig} from "../../../config/site-config";
import DataForm from "../Forms/DataForm";
import {LoginFormData} from "../../../config/forms/login-form";
import {useRouter} from "next/router";


const AuthLoginForm = (props) => {
    const router = useRouter();
    const [submitButtonText, setSubmitButtonText] = useState("Login",);
    const [error, setError] = useState({
        show: false,
        message: ""
    });

    const submitHandler = (values) => {
        props.getSessionTokenMiddleware(buildWpApiUrl(wpApiConfig.endpoints.token), values, submitCallbackHandler)
    }

    const submitCallbackHandler = (error, data) => {
        console.log(error, data)
        if (error) {
            setError({
                show: true,
                message: data.message
            });
        } else {
            props.requestCallback(error, data)
        }
    }

    return (
        <>
            {!props.session.authenticated &&
            <>
                {error.show &&
                <div className={"site-form--error--block"}>
                    {error.message}
                </div>
                }
                <DataForm
                    data={LoginFormData}
                    submitCallback={submitHandler}
                    submitButtonText={submitButtonText}
                />
            </>
            }
        </>
    );
}

function mapStateToProps(state) {
    // console.log(state.session)
    return {
        session: state.session
    };
}

export default connect(
    mapStateToProps,
    {getSessionTokenMiddleware}
)(AuthLoginForm);
