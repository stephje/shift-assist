import React from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const CustomCheckbox = ({
    name,
    label,
    legend,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (event) => {
        const { checked } = event.target;
        setFieldValue(name, checked);
    };

    const configForCheckbox = {
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
                <FormGroup>
                    <FormControlLabel 
                        control={<Checkbox { ...configForCheckbox }/>}
                        label={label}
                    />
                </FormGroup>
        </FormControl>
    );
};

export default CustomCheckbox;
