import React from 'react';
import AuthRegisterForm from "../Components/Auth/AuthRegisterForm";
const Register = (props) => {
    return (
        <div className="site-section bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 mb-5" data-aos="fade">
                        <AuthRegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;