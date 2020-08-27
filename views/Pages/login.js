import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSessionTokenMiddleware} from "../../redux/middleware/session-middleware";
import {buildWpApiUrl} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";
import {siteConfig} from "../../config/site-config";
import DataForm from "../Components/Forms/DataForm";
import Router from "next/router";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitButtonText: "Login",
            error: {
                show: false,
                message: ""
            },
            success: {
                show: true,
                message: ""
            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.getFormData = this.getFormData.bind(this)
        this.submitCallbackHandler = this.submitCallbackHandler.bind(this)
    }


    getFormData() {
        return {
            fields: [
                {
                    name: "username",
                    label: "Username",
                    fieldType: "text",
                    type: "text",
                    placeHolder: "Enter your username",
                    value: "",
                    validation: {
                        rules: [
                            {
                                type: "alphanumeric"
                            },
                            {
                                type: "length",
                                min: 5,
                                max: 16
                            }
                        ]
                    }
                },
                {
                    name: "password",
                    label: "Password",
                    type: "password",
                    fieldType: "text",
                    placeHolder: "Enter your password",
                    value: "",
                    validation: {
                        rules: [
                            {
                                type: "alphanumeric"
                            },
                            {
                                type: "length",
                                min: 5,
                                max: 16
                            }
                        ]
                    }
                },
            ]
        };
    };

    submitHandler(values) {
        this.props.getSessionTokenMiddleware(buildWpApiUrl(wpApiConfig.endpoints.token), values, this.submitCallbackHandler)
    }

    submitCallbackHandler(error, data) {
        console.log(error, data)
        if (error) {
            this.setState({
                error: {
                    show: true,
                    message: data.message
                }
            })
        } else {
            Router.push(siteConfig.defaultUserAccountHref, siteConfig.defaultUserAccountHref, { shallow: true })
        }
    }

    render() {
        return (
            <>
                {!this.props.session.authenticated &&
                <div className="site-section bg-light">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-7 mb-5" data-aos="fade">
                                <h2 className="mb-5 text-black">Log In</h2>
                                {this.state.error.show &&
                                <div className={"site-form--error--block"}>
                                    {this.state.error.message}
                                </div>
                                }
                                <DataForm
                                    data={this.getFormData()}
                                    submitCallback={this.submitHandler}
                                    submitButtonText={this.state.submitButtonText}
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
