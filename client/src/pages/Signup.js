import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Link,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AppBar from '../components/AppBar';
import StickyFooter from '../components/StickyFooter';

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// Styling from Material-UI template
const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signup() {
    // Use styles defined above
    const classes = useStyles();

    // Set initial form state
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        admin: false,
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    // Update form state on change
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // addUser query when form is submitted
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });
            
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    // Components and design based on Material-UI template
    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign up
                    </Typography>
                    <form
                        onSubmit={handleFormSubmit}
                        className={classes.form}
                        noValidate
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleChange}
                                    name='username'
                                    variant='outlined'
                                    required
                                    fullWidth
                                    id='username'
                                    label='Username'
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleChange}
                                    variant='outlined'
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleChange}
                                    variant='outlined'
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to='/login'
                                    variant='body2'
                                >
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <StickyFooter />
        </Container>
    );
}
