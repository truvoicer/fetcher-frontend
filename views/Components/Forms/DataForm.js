import React, {Component} from 'react';
import {Field, Formik} from "formik";
import {siteConfig} from "../../../config/site-config";
import {isSet} from "../../../library/utils";

const sprintf = require("sprintf").sprintf;

class DataForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: this.getInitialDataObject(),
        };

        this.getInitialDataObject = this.getInitialDataObject.bind(this)
        this.getInputRow = this.getInputRow.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
    }

    validationRules(rule, values, key) {
        switch (rule.type) {
            case "required":
                if (!values[key]) {
                    return 'Required';
                }
                break;
            case "email":
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[key])) {
                    return 'Invalid email address';
                }
                break;
            case "alphanumeric":
                if (!/^[\w]+$/.test(values[key])) {
                    return 'Can only contain letters and numbers';
                }
                break;
            case "length":
                if (values[key].length < parseInt(rule.min)) {
                    return sprintf('Must be more than %d characters', rule.min);
                } else if (values[key].length > parseInt(rule.max)) {
                    return sprintf('Must be less than %d characters', rule.max)
                }
                break;
            case "password":
                let conditions = "";
                rule.allowedChars?.map((char) => {
                    if (char === "alphanumeric") {
                        conditions += "[A-Z0-9.-]";
                    }
                    if (char === "symbols") {
                        conditions += "[*.! @#$%^&(){}[]:;<>,.?/~_+-=|\\]";
                    }
                })
                const regEx = new RegExp(sprintf("!/^%s$/i", conditions));
                if (regEx.test(values[key])) {
                    return sprintf("Can only contain (%s)", rule.allowedChars.join(", "));
                }
                break;
            case "match":
                if (values[key] !== values[rule.matchField]) {
                    return sprintf('Does not match with %s', this.getFieldByName(rule.matchField).label);
                }
                break;
        }
        return true;
    }

    getFieldByName(name) {
        let fieldObject = {};
        this.props.data.fields.map(field => {
            if (isSet(field.subFields)) {
                field.subFields.map((subField) => {
                    if (subField.name === name) {
                        fieldObject = subField
                    }
                })
            }
            if (field.name === name) {
                fieldObject = field
            }
        })
        return fieldObject
    }
    getIgnoredFields(values) {
        let ignoredFields = [];
        Object.keys(values).map((key) => {
            const field = this.getFieldByName(key);
            field.subFields?.map((subField) => {
                if ((field.fieldType === "checkbox" && !values[field.name]) ||
                    (field.fieldType === "checkbox" && values[field.name] === "")){
                    ignoredFields.push(subField.name);
                }
            })
        });
        return ignoredFields;
    }
    validateForm(values) {
        const errors = {};
        const ignoredFields = this.getIgnoredFields(values);
        Object.keys(values).map((key) => {
            const field = this.getFieldByName(key);
            if (!ignoredFields.includes(field.name)) {
                const isAllowEmpty = field.validation?.rules?.filter(rule => rule.type === "allow_empty");
                if(!isSet(isAllowEmpty) ||
                    (Array.isArray(isAllowEmpty) && isAllowEmpty.length > 0 && values[field.name] !== "" ) ||
                    (Array.isArray(isAllowEmpty) && isAllowEmpty.length === 0)
                    ) {
                    field.validation?.rules?.map((rule) => {
                        const validate = this.validationRules(rule, values, key);
                        // console.log(validate)
                        if (validate !== true) {
                            errors[key] = validate
                        }
                    })
                }
            }
        })
        return errors;
    };

    formSubmitHandler(values) {
        const ignoredFields = this.getIgnoredFields(values);
        Object.keys(values).map((key) => {
            const field = this.getFieldByName(key);
            if (field.fieldType === "checkbox" && values[field.name] === "") {
                values[field.name] = false;
            }
            if (ignoredFields.includes(key)) {
                values[key] = "";
            }
        });
        this.props.submitCallback(values);
    }

    getInitialDataObject() {
        let initialValues = {};
        this.props.data.fields.map((item) => {
            initialValues[item.name] = isSet(item.value) && item.fieldType === "text" ? item.value : "";
            if (isSet(item.subFields)) {
                item.subFields.map((subItem) => {
                    initialValues[subItem.name] = isSet(subItem.value) && subItem.fieldType === "text" ? subItem.value : "";
                })
            }
        })
        return initialValues;
    }

    getInputRow(field, errors, touched, handleBlur, handleChange, values) {
        return (
            <div className="row form-group form-group-text">
                <div className="col-md-12">
                    <label className="text-black" htmlFor={field.name}>
                        {field.label}
                        <span className={"site-form--error--field"}>
                            {errors[field.name] && touched[field.name] && errors[field.name]}
                        </span>
                    </label>
                    <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        className="form-control text-input"
                        placeholder={field.placeHolder}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[field.name]}
                    />
                </div>
            </div>
        )
    }

    render() {
        return (
            <Formik
                initialValues={this.state.initialValues}
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
                        <form className="p-5 bg-white site-form"
                              onSubmit={handleSubmit}>
                            {this.props.data.fields.map((field, index) => (
                                <React.Fragment key={index}>
                                    {field.fieldType === "text" &&
                                    this.getInputRow(field, errors, touched, handleBlur, handleChange, values)
                                    }
                                    {field.fieldType === "checkbox" &&
                                    <div className={"form-check-group"}>
                                        <div className="form-check">
                                            <label>
                                                <Field
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name={field.name}
                                                    // value={field.value}
                                                />
                                                {field.label}
                                            </label>
                                        </div>
                                        {field.subFields && values[field.name] &&
                                        <div className={"form-subfields"}>
                                            {field.subFields.map((subField, subFieldIndex) => (
                                                <React.Fragment key={subFieldIndex}>
                                                    {subField.fieldType === "text" &&
                                                    this.getInputRow(subField, errors, touched, handleBlur, handleChange, values)
                                                    }
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        }
                                    </div>
                                    }
                                </React.Fragment>
                            ))}

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <input type="submit"
                                           value={this.props.submitButtonText}
                                           className="btn btn-primary py-2 px-4 text-white"/>
                                </div>
                            </div>

                            {this.props.children}

                        </form>
                    </>
                )}
            </Formik>
        );
    }

}

export default DataForm;
