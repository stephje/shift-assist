import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';
import VolunteerRegistration from '../components/VolunteerRegistration'


export default function Register() {
  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box my={4} display="flex" justifyContent="center">
        <Typography variant="h4" component="h1" gutterBottom>
          <VolunteerRegistration />
        </Typography>
      </Box>
      <StickyFooter />
    </Container>
  );
}