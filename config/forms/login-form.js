export const LoginFormData = {
    fields: [
        {
            name: "username",
            // label: "Username",
            fieldType: "text",
            type: "text",
            placeHolder: "Enter your username",
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
            name: "password",
            // label: "Password",
            type: "password",
            fieldType: "text",
            placeHolder: "Enter your password",
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
    ]
}