import React, { useState } from "react";
import { Box, Container, Button, Grid } from '@material-ui/core';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';
import auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import RegistrationSummary from '../containers/RegistrationSummary';
import AssignedShiftList from '../containers/AssignedShiftList';



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

    //Set initial state to false
    const [registrationVisibility, setRegistrationVisibility] = useState(false);
    const [assignedShiftVisibility, setAssignedShiftVisibility] = useState(false);

    function toggleView(event) { 
        switch (event.target.textContent) {
            case 'View and Edit Registration':
                if(registrationVisibility){
                    setRegistrationVisibility(false);
                } else {
                    setAssignedShiftVisibility(false);
                    setRegistrationVisibility(true);
                }
                break;
            case 'View Assigned Shifts':
                if(assignedShiftVisibility){
                    setAssignedShiftVisibility(false);
                } else {
                    setRegistrationVisibility(false);
                    setAssignedShiftVisibility(true);
                }
                break;
            default:
                break;
        }
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
                    New Volunteer Registration
                </Button>
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    className={classes.mainButton}
                    onClick={toggleView}
                    >
                        View and Edit Registration
                </Button>
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    className={classes.mainButton}
                    onClick={toggleView}
                    >
                        View Assigned Shifts
                </Button>
                </Box>
                <Grid>
                    {registrationVisibility ? <RegistrationSummary /> : null}
                    {assignedShiftVisibility ? <AssignedShiftList /> : null}
                </Grid>
            </Container>
            <StickyFooter />
        </Container>
    );
}
