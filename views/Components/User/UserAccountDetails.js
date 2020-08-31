import React, {useState} from 'react';
import {connect} from "react-redux";
import {
    SESSION_USER,
    SESSION_USER_DISPLAY_NAME, SESSION_USER_EMAIL, SESSION_USER_FIRSTNAME, SESSION_USER_ID, SESSION_USER_LASTNAME,
    SESSION_USER_NICE_NAME, SESSION_USER_NICK_NAME
} from "../../../redux/constants/session-constants";
import DataForm from "../Forms/DataForm";
import {updateUserMiddleware, updateUserSessionData} from "../../../redux/middleware/session-middleware";
import {UserAccountDetailsData} from "../../../config/forms/user-account-details";

const UserAccountDetails = (props) => {
    const submitButtonText = "Update";
    const [response, setResponse] = useState({
        error: false,
        success: false,
        message: ""
    })
    const formSubmitCallback = (data) => {
        data.ID = props.user[SESSION_USER_ID];
        props.updateUserMiddleware(data, updateUserCallback)
    }

    const updateUserCallback = (error, data) => {
        if (!error) {
            console.log(data)
            props.updateUserSessionData(data.data)
            setResponse({
                error: false,
                success: true,
                message: data.message
            })
        } else {
            console.log(data.response.data.code)
            setResponse({
                error: true,
                success: false,
                message: data.response.data.code
            })
        }
    }
    console.log(response)
    return (
        <div className="user-account-details bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 mb-5" data-aos="fade">
                            <h2>My Account Details</h2>
                            {response.error &&
                            <div className={"error-block"}>
                                {response.message}
                            </div>
                            }
                            {response.success &&
                            <div className={"success-block"}>
                                {response.message}
                            </div>
                            }
                            <DataForm
                                data={UserAccountDetailsData(
                                    props.user[SESSION_USER_DISPLAY_NAME],
                                    props.user[SESSION_USER_NICE_NAME],
                                    props.user[SESSION_USER_NICK_NAME],
                                    props.user[SESSION_USER_FIRSTNAME],
                                    props.user[SESSION_USER_LASTNAME],
                                    props.user[SESSION_USER_EMAIL]
                                )}
                                submitCallback={formSubmitCallback}
                                submitButtonText={submitButtonText}
                            />
                        </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    // console.log(state.session)
    return {
        user: state.session[SESSION_USER]
    };
}

export default connect(
    mapStateToProps,
    {updateUserMiddleware, updateUserSessionData}
)(UserAccountDetails);

