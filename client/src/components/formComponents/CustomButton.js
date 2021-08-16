import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';

// This is a custom component created for use in forms
// Set up to use Formik context and also has styling set to match app
const CustomButton = ({
    children,
    ...otherProps
}) => {
    const { submitForm } = useFormikContext();

    const handleSubmit = () => {
        submitForm();
    }

    const configForButton = {
        variant: 'contained',
        color: 'primary',
        onClick: handleSubmit
    }

    return(
        <Button
        {...configForButton}
        >
            {children}
        </Button>
    );
};

export default CustomButton;