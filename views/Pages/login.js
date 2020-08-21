import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSessionTokenMiddleware} from "../../redux/middleware/session-middleware";
import {buildWpApiUrl} from "../../library/api/wp/middleware";
import {wpApiConfig} from "../../config/wp-api-config";
import {siteConfig} from "../../config/site-config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.formChangeHandler = this.formChangeHandler.bind(this)
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler(e) {
        e.preventDefault();
        this.props.getSessionTokenMiddleware(buildWpApiUrl(wpApiConfig.endpoints.token), this.state)
    }

    render() {
        return (
            <>
                {this.props.session.authenticated
                    ?
                    <p>User Logged in</p>
                    :
                    <div className="site-section bg-light">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-7 mb-5" data-aos="fade">
                                    <h2 className="mb-5 text-black">Log In</h2>
                                    <form className="p-5 bg-white" onSubmit={this.submitHandler}>
                                        <div className="row form-group">
                                            <div className="col-md-12">
                                                <label className="text-black" htmlFor="email">Username</label>
                                                <input
                                                    id="username"
                                                    name={"username"}
                                                    className="form-control"
                                                    onChange={this.formChangeHandler}
                                                />
                                            </div>
                                        </div>

                                        <div className="row form-group">
                                            <div className="col-md-12">
                                                <label className="text-black" htmlFor="subject">Password</label>
                                                <input type="password"
                                                       id="subject"
                                                       name={"password"}
                                                       className="form-control"
                                                       onChange={this.formChangeHandler}/>
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
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    console.log(state.session)
    return {
        session: state.session
    };
}

export default connect(
    mapStateToProps,
    {getSessionTokenMiddleware}
)(Login);
