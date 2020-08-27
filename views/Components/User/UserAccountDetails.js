import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    SESSION_USER,
    SESSION_USER_DISPLAY_NAME, SESSION_USER_EMAIL, SESSION_USER_FIRSTNAME, SESSION_USER_ID, SESSION_USER_LASTNAME,
    SESSION_USER_NICE_NAME, SESSION_USER_NICK_NAME
} from "../../../redux/constants/session-constants";
import DataForm from "../Forms/DataForm";
import {updateUserMiddleware, updateUserSessionData} from "../../../redux/middleware/session-middleware";

class UserAccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitButtonText: "Update",
            error: {
                show: false,
                message: ""
            },
            success: {
                show: false,
                message: ""
            }
        }
        this.getFormData = this.getFormData.bind(this);
        this.formSubmitCallback = this.formSubmitCallback.bind(this);
        this.updateUserCallback = this.updateUserCallback.bind(this);
    }

    getFormData() {
        return {
            fields: [
                {
                    name: "display_name",
                    label: "Display Name",
                    fieldType: "text",
                    type: "text",
                    placeHolder: "Enter a display name",
                    value: this.props.user[SESSION_USER_DISPLAY_NAME],
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
                    name: "nicename",
                    label: "Nicename",
                    type: "text",
                    fieldType: "text",
                    placeHolder: "Enter a nice name",
                    value: this.props.user[SESSION_USER_NICE_NAME],
                    validation: {
                        rules: [
                            {
                                type: "allow_empty"
                            },
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
                    name: "nickname",
                    label: "Nickname",
                    type: "text",
                    fieldType: "text",
                    placeHolder: "Enter your nick name",
                    value: this.props.user[SESSION_USER_NICK_NAME],
                    validation: {
                        rules: [
                            {
                                type: "allow_empty"
                            },
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
                    name: "first_name",
                    label: "First Name",
                    type: "text",
                    fieldType: "text",
                    placeHolder: "Enter your first name",
                    value: this.props.user[SESSION_USER_FIRSTNAME],
                    validation: {
                        rules: [
                            {
                                type: "allow_empty"
                            },
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
                    name: "last_name",
                    label: "Last Name",
                    type: "text",
                    fieldType: "text",
                    placeHolder: "Enter your last name",
                    value: this.props.user[SESSION_USER_LASTNAME],
                    validation: {
                        rules: [
                            {
                                type: "allow_empty"
                            },
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
                    value: this.props.user[SESSION_USER_EMAIL],
                    validation: {
                        rules: [
                            {
                                type: "email"
                            },
                        ]
                    }
                },
                {
                    name: "current_password",
                    label: "Enter Password",
                    type: "password",
                    fieldType: "text",
                    field: "input",
                    placeHolder: "",
                    validation: {
                        rules: [
                            {
                                type: "required"
                            },
                        ]
                    }
                },
                {
                    label: "Change Password?",
                    name: "change_password",
                    fieldType: "checkbox",
                    value: "1",
                    checkboxType: "true_false",
                    subFields: [
                        {
                            name: "new_password",
                            label: "New Password",
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
                                        matchField: "new_password",
                                    },
                                ]
                            }
                        },
                    ]
                },
            ]
        }
    }

    formSubmitCallback(data) {
        data.ID = this.props.user[SESSION_USER_ID];
        this.props.updateUserMiddleware(data, this.updateUserCallback)
    }

    updateUserCallback(error, data) {
        if (!error) {
            this.props.updateUserSessionData(data.data)
            this.setState({
                error: {
                    show: true,
                    message: data.message
                }
            })
        } else {
            this.setState({
                success: {
                    show: true,
                    message: data.response.data.code
                }
            })
        }
    }

    render() {
        return (
            <div className="user-account-details bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 mb-5" data-aos="fade">
                                <h2>My Account Details</h2>
                                {this.state.error.show &&
                                <div className={"error-block"}>
                                    {this.state.error.message}
                                </div>
                                }
                                {this.state.success.show &&
                                <div className={"success-block"}>
                                    {this.state.success.message}
                                </div>
                                }
                                <DataForm
                                    data={this.getFormData()}
                                    submitCallback={this.formSubmitCallback}
                                    submitButtonText={this.state.submitButtonText}
                                />
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
        user: state.session[SESSION_USER]
    };
}

export default connect(
    mapStateToProps,
    {updateUserMiddleware, updateUserSessionData}
)(UserAccountDetails);

