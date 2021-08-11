import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    Grid,
    Typography
} from '@material-ui/core'
import CustomTextField from './formComponents/CustomTextField';
import CustomCheckbox from './formComponents/CustomCheckbox';
import CustomButton from './formComponents/CustomButton';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    }
}));

const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    medical: '',
    acceptedCommsPermissions: false,
    termsAndConditions: false,
    
};

const FORM_VALIDATION = yup.object().shape({
    firstName: yup
        .string()
        .required('Required'),
    lastName: yup
        .string()
        .required('Required'),
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Required'),
    mobile: yup
        .string()
        .required('Required'),
    address: yup
        .string(),
    suburb: yup
        .string(),
    state: yup
        .string(),
    postcode: yup
        .string()
        .required('Required'),
    medical: yup
        .string(),
    commsPermissions: yup
        .boolean()
        .oneOf([true], 'You must accept electronic communications to volunteer.')
        .required('You must accept electronic communications to volunteer.'),
    termsAndConditions: yup
        .boolean()
        .oneOf([true], 'The Terms and Conditions must be accepted.')
        .required('The Terms and Conditions must be accepted.')
});

function onSubmit(values) {
    console.log(values);
}

export default function VolunteerRegistration() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                {/* Header Here */}
            </Grid>
            <Grid item xs={12}>
                <Container maxWidth='md'>
                    <div className={classes.formWrapper}>

                        <Formik
                            initialValues={{
                                ...INITIAL_FORM_STATE
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={onSubmit}
                        >
                            <Form>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <Typography>
                                            Basic Details
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomTextField
                                            name='firstName'
                                            label='First Name'
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomTextField
                                            name='lastName'
                                            label='Last Name'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='email'
                                            label='Email Address'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='mobile'
                                            label='Mobile Phone Number'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='address'
                                            label='Address'
                                        />
                                    </Grid>

                                    
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='suburb'
                                            label='Suburb'
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomTextField
                                            name='postcode'
                                            label='Postcode'
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomTextField
                                            name='state'
                                            label='State'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='medical'
                                            label='Medical'
                                            multiline={true}
                                            rows={5}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>
                                            Volunteer Areas
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>
                                            Qualifications
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>
                                            Availability
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>
                                            Emergency Contact Details
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>
                                            Volunteer Obligations
                                        </Typography>

                                        <Grid item xs={12}>
                                            <CustomCheckbox 
                                            name='commsPermissions'
                                            legend='Electronic Communications'
                                            label='I consent to receive electronic communications in
                                            the form of email, SMS or phone.'/>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <CustomCheckbox 
                                            name='termsAndConditions'
                                            legend='Terms and Conditions'
                                            label='I accept the Volunteer Terms and Conditions.'/>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomButton>
                                            Submit
                                        </CustomButton>
                                    </Grid>

                                </Grid>
                            </Form>
                        </Formik>

                    </div>
                </Container>
            </Grid>
        </Grid>
    );
};