import React from 'react';
import AuthLoginForm from "../Components/Auth/AuthLoginForm";
const Login = (props) => {
    return (
        <>
            <div className="site-section bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 mb-5" data-aos="fade">
                            <AuthLoginForm />
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}
export default Login;