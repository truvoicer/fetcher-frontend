import React, {Component} from 'react';
import {siteConfig} from "../../config/site-config";

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="site-section bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 mb-5" data-aos="fade">

                            <h2 className="mb-5 text-black">Register</h2>

                            <form action="#" className="p-5 bg-white">

                                <div className="row form-group">

                                    <div className="col-md-12">
                                        <label className="text-black" htmlFor="email">Email</label>
                                        <input type="email" id="email" className="form-control"/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-md-12">
                                        <label className="text-black" htmlFor="subject">Password</label>
                                        <input type="password" id="subject" className="form-control"/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-md-12">
                                        <label className="text-black" htmlFor="subject">Re-type Password</label>
                                        <input type="password" id="subject" className="form-control"/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-12">
                                        <p>Have an account? <a href={siteConfig.defaultLoginHref}>Log In</a></p>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-md-12">
                                        <input type="submit" value="Sign In"
                                               className="btn btn-primary py-2 px-4 text-white"/>
                                    </div>
                                </div>


                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
