import React, {Component} from 'react';
import {siteConfig} from "../../config/site-config";
import {connect} from "react-redux";
import {createUserMiddleware, getSessionTokenMiddleware} from "../../redux/middleware/session-middleware";
import {Formik} from 'formik';
import {
    SESSION_USER_DISPLAY_NAME, SESSION_USER_EMAIL,
    SESSION_USER_NICE_NAME,
    SESSION_USER_NICK_NAME
} from "../../redux/constants/session-constants";
import DataForm from "../Components/Forms/DataForm";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitButtonText: "Register",
            error: {
                show: false,
                message: ""
            },
            success: {
                show: false,
                message: ""
            }
        };
        this.getFormData = this.getFormData.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
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
                    placeHolder: "Enter a username",
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
                    name: "email",
                    label: "Email",
                    type: "email",
                    fieldType: "text",
                    placeHolder: "Enter your email",
                    value: "",
                    validation: {
                        rules: [
                            {
                                type: "email"
                            },
                        ]
                    }
                },
                {
                    name: "password",
                    label: "Password",
                    type: "password",
                    fieldType: "text",
                    placeHolder: "",
                    validation: {
                        rules: [
                            {
                                type: "password",
                                allowedChars: ["alphanumeric", "symbols"]
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
                    name: "confirm_password",
                    label: "Confirm password",
                    type: "password",
                    fieldType: "text",
                    placeHolder: "",
                    validation: {
                        rules: [
                            {
                                type: "match",
                                matchField: "password",
                            },
                        ]
                    }
                },
            ]
        }
    }

    formSubmitHandler(values) {
        this.props.createUserMiddleware(values, this.submitCallbackHandler)
    }

    submitCallbackHandler(error, data) {
        if (error) {
            this.setState({
                error: {
                    show: true,
                    message: data.response.data.message
                }
            })
        } else {
            this.setState({
                error: {
                    show: false,
                    message: ""
                },
                success: {
                    show: true,
                    message: data.message
                }
            })
        }
    }

    render() {
        return (

            <div className="site-section bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 mb-5" data-aos="fade">
                            {this.state.success.show
                                ?
                                <div className="p-5 bg-white">
                                    {this.state.success.message}
                                </div>
                                :
                                <>
                                    <h2>Register</h2>
                                    {this.state.error.show &&
                                    <div className="p-5 bg-white">
                                        {this.state.error.message}
                                    </div>
                                    }
                                    <DataForm
                                        data={this.getFormData()}
                                        submitCallback={this.formSubmitHandler}
                                        submitButtonText={this.state.submitButtonText}
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
                            }
                        </div>

                    </div>
                </div>
            </div>
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
    {createUserMiddleware}
)(Register);
