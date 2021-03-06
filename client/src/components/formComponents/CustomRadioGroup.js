import React from 'react';
import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

// This is a custom component created for use in forms
// Set up to use Formik context and also has styling set to match app
const CustomRadioGroup = ({
    name,
    legend,
    label,
    value,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (event) => {
        setFieldValue(name, event.target.value);
    };

    const configForRadioButton = {
        ...field,
        onChange: handleChange
    };

    const configFormControl = {};
    if (meta && meta.touched && meta.error) {
        configFormControl.error = true;
    }

    return(
        <FormControl {...configFormControl}>
            <FormLabel component="legend">{legend}</FormLabel>
                <RadioGroup name={name} value={value} onChange={handleChange} {...configForRadioButton}>
                    <FormControlLabel 
                        control={<Radio />}
                        label={otherProps.option1}
                        value={otherProps.option1}
                    />
                    <FormControlLabel 
                        control={<Radio />}
                        label={otherProps.option2}
                        value={otherProps.option2}
                    />
                </RadioGroup>
        </FormControl>
    );
};

export default CustomRadioGroup;
