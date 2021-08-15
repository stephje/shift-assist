import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Typography, FormLabel } from '@material-ui/core';
import CustomTextField from './formComponents/CustomTextField';
import CustomCheckbox from './formComponents/CustomCheckbox';
import CustomButton from './formComponents/CustomButton';
import CustomRadioGroup from './formComponents/CustomRadioGroup';
import RolesChecklist from '../containers/RolesChecklist';
import QualificationsChecklist from '../containers/QualificationsChecklist';
import TimeslotChecklist from '../containers/TimeslotChecklist';
import { ADD_VOLUNTEER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const useStyles = makeStyles(theme => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
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
    previousExperience: 'No',
    medical: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    commsPermissions: false,
    termsAndConditions: false,
};

const FORM_VALIDATION = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Required'),
    mobile: yup.string().required('Required'),
    address: yup.string(),
    suburb: yup.string(),
    state: yup.string(),
    postcode: yup.string().required('Required'),
    previousExperience: yup.string().required('Required'),
    medical: yup.string(),
    emergencyContactName: yup.string().required('Required'),
    emergencyContactRelationship: yup.string().required('Required'),
    emergencyContactPhone: yup.string().required('Required'),
    commsPermissions: yup
        .boolean()
        .oneOf(
            [true],
            'You must accept electronic communications to volunteer.'
        )
        .required('You must accept electronic communications to volunteer.'),
    termsAndConditions: yup
        .boolean()
        .oneOf([true], 'The Terms and Conditions must be accepted.')
        .required('The Terms and Conditions must be accepted.'),
});

export default function VolunteerRegistration() {
    const classes = useStyles();

    const [addVolunteer] = useMutation(ADD_VOLUNTEER);

    async function onSubmit(values) {
        let volunteerObject = {};
        let availabilityArray = [];
        let rolesArray = [];
        let qualificationsArray = [];

        const timeslots = ['morning', 'afternoon', 'evening'];

        const qualifications = ['rsa', 'mlp', 'sfa', 'ptd'];

        const roles = [
            'barAttendant',
            'barManager',
            'shuttleBusDriver',
            'firstAidAttendant',
            'ticketOfficeAttendant',
            'merchAttendant',
            'wasteCrewMember',
        ];

        for (const property in values) {
            if (timeslots.includes(property) && values[property] === true) {
                availabilityArray.push(property);
            } else if (
                qualifications.includes(property) &&
                values[property] === true
            ) {
                qualificationsArray.push(property);
            } else if (roles.includes(property) && values[property] === true) {
                rolesArray.push(property);
            } else if (values[property] !== false) {
                volunteerObject[property] = values[property];
            }
        }

        volunteerObject.availability = availabilityArray;
        volunteerObject.nominatedRoles = rolesArray;
        volunteerObject.qualificationsHeld = qualificationsArray;

        try {
            await addVolunteer({ variables: { volunteer: volunteerObject } });
        } catch (error) {
            console.error(error);
        }
    }

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
                                ...INITIAL_FORM_STATE,
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={onSubmit}
                        >
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box
                                            align='center'
                                            bgcolor='primary.main'
                                            color='#ffffff'
                                            p={1}
                                        >
                                            <Typography
                                                variant='h5'
                                                component='h2'
                                            >
                                                Volunteer Details
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomTextField
                                            name='firstName'
                                            label='First Name*'
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomTextField
                                            name='lastName'
                                            label='Last Name*'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='email'
                                            label='Email Address*'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='mobile'
                                            label='Mobile Phone Number*'
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
                                            label='Postcode*'
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomTextField
                                            name='state'
                                            label='State'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomRadioGroup
                                            name='previousExperience'
                                            legend='Have you previously volunteered at this festival?*'
                                            option1='Yes'
                                            option2='No'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormLabel component='legend'>
                                            If you have any injury or
                                            pre-existing medical condition that
                                            may limit the activities that you
                                            can undertake or which may be
                                            aggravated by some activities,
                                            please list these below:
                                        </FormLabel>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='medical'
                                            label=''
                                            multiline={true}
                                            rows={5}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box
                                            align='center'
                                            bgcolor='primary.main'
                                            color='#ffffff'
                                            p={1}
                                        >
                                            <Typography
                                                variant='h5'
                                                component='h2'
                                            >
                                                Volunteer Areas
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormLabel component='legend'>
                                            Select the areas in which you would
                                            prefer to volunteer. Please choose
                                            several options
                                        </FormLabel>
                                        <RolesChecklist />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box
                                            align='center'
                                            bgcolor='primary.main'
                                            color='#ffffff'
                                            p={1}
                                        >
                                            <Typography
                                                variant='h5'
                                                component='h2'
                                            >
                                                Qualifications
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormLabel component='legend'>
                                            Check all that apply
                                        </FormLabel>
                                        <QualificationsChecklist />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box
                                            align='center'
                                            bgcolor='primary.main'
                                            color='#ffffff'
                                            p={1}
                                        >
                                            <Typography
                                                variant='h5'
                                                component='h2'
                                            >
                                                Availability
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormLabel component='legend'>
                                            Check all that apply
                                        </FormLabel>
                                        <TimeslotChecklist />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box
                                            align='center'
                                            bgcolor='primary.main'
                                            color='#ffffff'
                                            p={1}
                                        >
                                            <Typography
                                                variant='h5'
                                                component='h2'
                                            >
                                                Emergency Contact Details
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='emergencyContactName'
                                            label='Emergency Contact Name*'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='emergencyContactRelationship'
                                            label='Relationship to You*'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomTextField
                                            name='emergencyContactPhone'
                                            label='Emergency Contact Phone*'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box
                                            align='center'
                                            bgcolor='primary.main'
                                            color='#ffffff'
                                            p={1}
                                        >
                                            <Typography
                                                variant='h5'
                                                component='h2'
                                            >
                                                Volunteer Obligations
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomCheckbox
                                            name='commsPermissions'
                                            legend='Electronic Communications*'
                                            label='I consent to receive electronic communications in
                                        the form of email, SMS or phone.'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomCheckbox
                                            name='termsAndConditions'
                                            legend='Terms and Conditions*'
                                            label='I accept the Volunteer Terms and Conditions.'
                                        />
                                    </Grid>

                                    <Grid item xs={12} align='center'>
                                        <CustomButton>Submit</CustomButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
}
