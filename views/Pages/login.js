import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSessionTokenMiddleware} from "../../redux/middleware/session-middleware";
import {buildWpApiUrl} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";
import {siteConfig} from "../../config/site-config";
import {Formik} from "formik";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: "",
                password: "",
            },
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
        this.validateForm = this.validateForm.bind(this)
        this.submitCallbackHandler = this.submitCallbackHandler.bind(this)
    }


    validateForm(values) {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    };

    submitHandler(values) {
        this.props.getSessionTokenMiddleware(buildWpApiUrl(wpApiConfig.endpoints.token), values, this.submitCallbackHandler)
    }

    submitCallbackHandler(error, data) {
        // console.log(error, data)
        if (error) {
            this.setState({
                error: {
                    show: true,
                    message: data.message
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
            <>
                {this.props.session.authenticated
                    ?
                    <p>User Logged in</p>
                    :
                    <Formik
                        initialValues={this.state.data}
                        validate={values => this.validateForm(values)}
                        onSubmit={values => this.submitHandler(values)}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                          }) => (
                    <div className="site-section bg-light">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-7 mb-5" data-aos="fade">
                                    <h2 className="mb-5 text-black">Log In</h2>
                                    <form id={"login_form"} className="p-5 bg-white site-form" onSubmit={handleSubmit}>
                                        {this.state.success.show &&
                                        <div className={"site-form--results--block"}>
                                            {this.state.success.message}
                                        </div>
                                        }
                                        {this.state.error.show &&
                                        <div className={"site-form--error--block"}>
                                            {this.state.error.message}
                                        </div>
                                        }
                                        <div className="row form-group">
                                            <div className="col-md-12">
                                                <label className="text-black" htmlFor="email">
                                                    Username
                                                    <span className={"site-form--error--field"}>
                                                        {errors.username && touched.username && errors.username}
                                                    </span>
                                                </label>
                                                <input
                                                    type="username"
                                                    name="username"
                                                    className="form-control"
                                                    placeholder={"Enter username"}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.username}
                                                />
                                            </div>
                                        </div>

                                        <div className="row form-group">
                                            <div className="col-md-12">
                                                <label className="text-black" htmlFor="subject">
                                                    Password
                                                    <span className={"site-form--error--field"}>
                                                        {errors.password && touched.password && errors.password}
                                                    </span>
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                            </div>
                                        </div>

                                        <div className="row form-group">
                                            <div className="col-12">
                                                <p>No account yet? <a href={siteConfig.defaultRegisterHref}>Register</a></p>
                                            </div>
                                        </div>


                                        <div className="row form-group">
                                            <div className="col-md-12">
                                                <input type="submit"
                                                       value="Sign In"
                                                       className="btn btn-primary py-2 px-4 text-white"/>
                                            </div>
                                        </div>


                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                        )}
                    </Formik>
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
