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



export default function Login() {
  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Log In
        </Typography>
      </Box>
      <StickyFooter />
    </Container>
  );
}