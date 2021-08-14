import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';
import logo from '../images/shiftassist.png';

export default function Home() {
  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
        <Container>
        <Grid container justifyContent='center'>
        <Box>
          <img src={logo} alt="Workers" />
          </Box>
        </Grid>
        </Container>
      <StickyFooter />
    </Container>
  );
}

