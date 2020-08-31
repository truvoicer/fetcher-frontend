import React, {Component, useState} from 'react';
import {siteConfig} from "../../../config/site-config";
import {connect} from "react-redux";
import {createUserMiddleware, getSessionTokenMiddleware} from "../../../redux/middleware/session-middleware";
import DataForm from "../Forms/DataForm";
import {RegisterFormData} from "../../../config/forms/register-form";

const AuthRegisterForm = (props) => {
    const [submitButtonLabel, setSubmitButtonLabel] = useState("Register");
    const [response, setResponse] = useState({
        error: false,
        success: false,
        message: ""
    });


    const formSubmitHandler = (values) => {
        props.createUserMiddleware(values, submitCallbackHandler)
    }

    const submitCallbackHandler = (error, data) => {
        if (error) {
            setResponse({
                error: true,
                success: false,
                message: data.message
            })
        } else {
            setResponse({
                error: false,
                success: true,
                message: data.message
            })
        }
    }

    return (

        <>
            {response.success &&
            <div className="p-5 bg-white">
                {response.message}
            </div>
            }
            {response.error &&
            <div className="p-5 bg-white">
                {response.message}
            </div>
            }
            <DataForm
                data={RegisterFormData}
                submitCallback={formSubmitHandler}
                submitButtonText={submitButtonLabel}
            >
                <div className="row form-group">
                    <div className="col-12">
                        <p>Have an account?
                            <a href={siteConfig.defaultLoginHref}>Log In</a>
                        </p>
                    </div>
                </div>
            </DataForm>
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
    {createUserMiddleware}
)(AuthRegisterForm);
