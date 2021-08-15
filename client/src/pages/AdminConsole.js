import React, { useState } from "react";
import { Button, Container, Box, Grid } from '@material-ui/core';
import auth from '../utils/auth';
import { Redirect, Link } from 'react-router-dom';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';
import VolunteerList from '../containers/VolunteerList'
import { makeStyles } from '@material-ui/core/styles';
import admin from '../images/admin.png';

export default function AdminConsole() {
    
    const useStyles = makeStyles(theme => ({
        flex: {
            margin: theme.spacing(2),
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
        },
        mainButton: {
            width: '300px',
            margin: '10px'
        }
    }));

    const classes = useStyles();

    const [volunteerVisibility, setVolunteerVisibility] = useState(false);
    const [shiftVisibility, setShiftVisibility] = useState(false);
    // const [showShiftText, setShiftText] = useState(false);
    const VolunteerText = () => <div>You clicked the Volunteer button!</div>;
    const ShiftText = () => <div>You clicked the Shift button!</div>;

        //TO DO: WRITE THIS FUNCTION
        function toggleView(event) { 
            console.log(event.target.textContent)
            switch (event.target.textContent) {
                case 'Volunteer View':
                    if(volunteerVisibility){
                        setVolunteerVisibility(false);
                    } else {
                        setShiftVisibility(false);
                        setVolunteerVisibility(true);
                    }
                    break;
                case 'Shift View':
                    if(shiftVisibility){
                        setShiftVisibility(false);
                    } else {
                        setVolunteerVisibility(false);
                        setShiftVisibility(true);
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
            {auth.isAdmin() ? (
                      <Container>
                      <Box className={classes.flex}>
                          <Button
                              size='large'
                              variant='contained'
                              color='primary'
                              className={classes.mainButton}
                              onClick={toggleView}
                          >
                              Volunteer View
                          </Button>
                          <Button
                              size='large'
                              variant='contained'
                              color='primary'
                              className={classes.mainButton}
                              onClick={toggleView}
                              >
                                  Shift View
                              </Button>
                          </Box>
                          <Grid>
                          {volunteerVisibility ? <VolunteerText /> : null}
                          {shiftVisibility ? <ShiftText /> : null}
                          </Grid>
                          
                      </Container>
          ) : (
            <Container >
        <Grid container justifyContent='center'>
          <Box >
          <img src={admin} alt="Workers" width="100%"/>
          </Box>
        </Grid>
        <Grid container justifyContent='center'>
        <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    className={classes.startButton}
                    component={Link} to="/"
                >
                    Admin Area! <br/> Return to Main Page
                </Button>
          </Grid>
        </Container>
          )}
            <StickyFooter />
        </Container>
    );
}
