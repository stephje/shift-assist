import React from 'react';
import { Button, Container, Box } from '@material-ui/core';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';
import auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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
            <StickyFooter />
        </Container>
    );
}
