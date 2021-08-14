import React from 'react';
import { Button, Container, Box, Grid } from '@material-ui/core';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';
import auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import admin from '../images/admin.png';


export default function AdminConsole() {
    
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

    const classes = useStyles();

        //TO DO: WRITE THIS FUNCTION
        function toggleView() {
            console.log("Toggle View")
        }

    //Redirect to login page if not logged in
    if (auth.loggedIn() === false) {
        return <Redirect to='/login' />;
    }

    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
            {Auth.isAdmin() ? (
                      <Container>
                      <Box className={classes.flexColumn}>
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
