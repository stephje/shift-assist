import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';

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
        fullWidth: true,
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