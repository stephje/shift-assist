import React from 'react';
import { Box, Container, Button } from '@material-ui/core';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';
import auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


export default function UserConsole() {

    //Define styles
    const useStyles = makeStyles(theme => ({
        flexColumn: {
            margin: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        mainButton: {
            width: '300px',
            margin: '10px'
        }
    }));

    //Use styles
    const classes = useStyles();

    //This will eventually render all shifts assigned to a user. To be delivered in next slice
    function displayShifts() {
        console.log("Shifts will be displayed")
    }

    //Redirect to login page if not logged in
    if (auth.loggedIn() === false) {
        return <Redirect to='/login' />;
    }

    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
            <Container>
                <Box className={classes.flexColumn}>
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    className={classes.mainButton}
                    component={Link} to="/register"
                >
                    Volunteer Registration
                </Button>
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    className={classes.mainButton}
                    onClick={displayShifts}
                    >
                        View Shifts
                    </Button>
                </Box>
            </Container>
            <StickyFooter />
        </Container>
    );
}
