import React, {Component} from 'react';
import {siteConfig} from "../../config/site-config";
import {connect} from "react-redux";
import {createUserMiddleware, getSessionTokenMiddleware} from "../../redux/middleware/session-middleware";
import {Formik} from 'formik';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: '',
                email: '',
                password: '',
                confirm_password: '',
            },
            error: {
                show: false,
                message: ""
            },
            success: {
                show: false,
                message: ""
            }
        };
        this.validateForm = this.validateForm.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
        this.submitCallbackHandler = this.submitCallbackHandler.bind(this)
    }

    validateForm(values) {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required';
        } else if (values.username.length > 15) {
            errors.username = 'Must be 15 characters or less';
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length > 15) {
            errors.password = 'Must be 15 characters or less';
        }
        if (!values.confirm_password) {
            errors.confirm_password = 'Required';
        } else if (values.confirm_password !== values.password) {
            errors.confirm_password = 'Does not match';
        }
        return errors;
    };

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
                                <Formik
                                    initialValues={this.state.data}
                                    validate={values => this.validateForm(values)}
                                    onSubmit={values => this.formSubmitHandler(values)}
                                >
                                    {({
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleBlur,
                                          handleSubmit,
                                      }) => (
                                        <>
                                            <h2 className="mb-5 text-black">Register</h2>
                                            <form id="register_form" className="p-5 bg-white site-form"
                                                  onSubmit={handleSubmit}>

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
                                                        <label className="text-black" htmlFor="email">
                                                            Email
                                                            <span className={"site-form--error--field"}>
                                                        {errors.email && touched.email && errors.email}
                                                    </span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="form-control"
                                                            placeholder={"john@doe.com"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email}
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
                                                            name="password"
                                                            id="password"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row form-group">
                                                    <div className="col-md-12">
                                                        <label className="text-black" htmlFor="subject">
                                                            Re-type Password
                                                            <span className={"site-form--error--field"}>
                                                        {errors.confirm_password && touched.confirm_password && errors.confirm_password}
                                                    </span>
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="confirm_password"
                                                            name="confirm_password"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.confirm_password}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row form-group">
                                                    <div className="col-12">
                                                        <p>Have an account? <a href={siteConfig.defaultLoginHref}>Log
                                                            In</a></p>
                                                    </div>
                                                </div>

                                                <div className="row form-group">
                                                    <div className="col-md-12">
                                                        <input type="submit" value="Sign In"
                                                               className="btn btn-primary py-2 px-4 text-white"/>
                                                    </div>
                                                </div>


                                            </form>
                                        </>
                                    )}
                                </Formik>
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
