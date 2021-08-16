import React from 'react';
import { Box, Button, Container, Grid } from '@material-ui/core';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';
import logo from '../images/shiftassist.png';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function Home() {
    //Set styles
    const useStyles = makeStyles(theme => ({
        startButton: {
            width: '300px',
            margin: '10px',
            padding: '20px',
        },
    }));

    //Use styles
    const classes = useStyles();

    //Render button that links to Admin Console if logged in as an admin
    //Render button that links to User Console if logged in as a non-admin user
    //Render button that links to login page if not logged in yet
    function renderStartButton() {
        if (Auth.loggedIn() && Auth.isAdmin()) {
            return (
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    className={classes.startButton}
                    component={Link}
                    to='/adminconsole'
                >
                    Get Started
                </Button>
            );
        } else if (Auth.loggedIn() && !Auth.isAdmin()) {
            return (
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    className={classes.startButton}
                    component={Link}
                    to='/userconsole'
                >
                    Get Started
                </Button>
            );
        } else {
            return (
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    className={classes.startButton}
                    component={Link}
                    to='/login'
                >
                    Get Started
                </Button>
            );
        }
    }

    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
            <Container>
                <Grid container justifyContent='center'>
                    <Box>
                        <img src={logo} alt='Workers' width='100%' />
                    </Box>
                </Grid>
                <Grid container justifyContent='center'>
                    {renderStartButton()}
                </Grid>
            </Container>
            <StickyFooter />
        </Container>
    );
}
