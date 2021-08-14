import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';
import auth from '../utils/auth';
import { Redirect } from 'react-router-dom';

export default function AdminConsole() {
    //Redirect to login page if not logged in
    if (auth.loggedIn() === false) {
        return <Redirect to='/login' />;
    }

    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
            <Box my={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Admin Console
                </Typography>
            </Box>
            <StickyFooter />
        </Container>
    );
}
