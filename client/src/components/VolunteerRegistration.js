import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';


const validationSchema = yup.object({
    firstName: yup
        .string('Enter your first name')
        .required('First name is required'),
    lastName: yup
        .string('Enter your first name')
        .required('Last name is required'),
    address: yup
    .string('Enter your address'),
    suburb: yup
    .string('Enter your town/suburb'),
    postcode: yup
    .string('Enter your postcode')
    .required('Postcode is required'),
    state: yup
    .string('Enter your state'),
    mobile: yup
    .string('Enter your mobile phone number'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

export default function VolunteerRegistration() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            address: '',
            suburb: '',
            postcode: '',
            state: '',
            mobile: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box display='flex'>
                    <TextField
                        fullWidth
                        id='firstName'
                        name='firstName'
                        label='First Name*'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.firstName &&4
                            Boolean(formik.errors.firstName)
                        }
                        helperText={
                            formik.touched.firstName && formik.errors.firstName
                        }
                    />
                    <TextField
                        fullWidth
                        id='lastName'
                        name='lastName'
                        label='Last Name*'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                        }
                        helperText={
                            formik.touched.lastName && formik.errors.lastName
                        }
                    />
                </Box>
                <TextField
                    fullWidth
                    id='address'
                    name='address'
                    label='Address'
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                />
                <TextField
                    fullWidth
                    id='suburb'
                    name='suburb'
                    label='Town/Suburb'
                    value={formik.values.suburb}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.suburb && Boolean(formik.errors.suburb)
                    }
                    helperText={formik.touched.suburb && formik.errors.suburb}
                />
                <Box display='flex'>
                    <TextField
                        fullWidth
                        id='postcode'
                        name='postcode'
                        label='Postcode*'
                        value={formik.values.postcode}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.postcode &&
                            Boolean(formik.errors.postcode)
                        }
                        helperText={
                            formik.touched.postcode && formik.errors.postcode
                        }
                    />
                    <TextField
                        fullWidth
                        id='state'
                        name='state'
                        label='State'
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.state && Boolean(formik.errors.state)
                        }
                        helperText={formik.touched.state && formik.errors.state}
                    />
                </Box>
                <TextField
                    fullWidth
                    id='mobile'
                    name='mobile'
                    label='Mobile*'
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                />
                <TextField
                    fullWidth
                    id='email'
                    name='email'
                    label='Email Address*'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Box display='flex' justifyContent='center' my={2}>
                <Button
                    color='primary'
                    variant='contained'
                    // fullWidth
                    type='submit'
                >
                    Submit
                </Button>
                </Box>
            </form>
        </div>
    );
}
