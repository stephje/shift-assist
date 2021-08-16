import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

// This is a custom component created for use in forms
// Set up to use Formik useField and also has styling set to match app
const CustomTextField = ({
    name,
    ...otherProps
}) => {

    const [field, meta] = useField(name);

    const configForTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    if (meta && meta.touched && meta.error) {
        configForTextField.error = true;
        configForTextField.helperText = meta.error;
    }

    return(
        <TextField {...configForTextField}/>
    );
};

export default CustomTextField;
