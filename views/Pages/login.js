import React, {useState} from 'react';
import {connect} from "react-redux";
import {getSessionTokenMiddleware} from "../../redux/middleware/session-middleware";
import {buildWpApiUrl} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";
import {siteConfig} from "../../config/site-config";
import DataForm from "../Components/Forms/DataForm";
import {LoginFormData} from "../../config/forms/login-form";
import {useRouter} from "next/router";


const Login = (props) => {
    const router = useRouter();
    const [ submitButtonText, setSubmitButtonText ] = useState("Login",);
    const [ error, setError ] = useState({
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
            router.push(siteConfig.defaultUserAccountHref, siteConfig.defaultUserAccountHref, { shallow: true })
        }
    }

    return (
        <>
            {!props.session.authenticated &&
            <div className="site-section bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 mb-5" data-aos="fade">
                            <h2 className="mb-5 text-black">Log In</h2>
                            {error.show &&
                            <div className={"site-form--error--block"}>
                                {error.message}
                            </div>
                            }
                            <DataForm
                                data={LoginFormData}
                                submitCallback={submitHandler}
                                submitButtonText={submitButtonText}
                            >
                                <div className="row form-group">
                                    <div className="col-12">
                                        <p>No account yet? <a href={siteConfig.defaultRegisterHref}>Register</a></p>
                                    </div>
                                </div>
                            </DataForm>
                        </div>
                    </div>
                </div>
            </div>
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
)(Login);
