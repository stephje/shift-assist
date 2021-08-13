import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import StickyFooter from '../components/StickyFooter';
import AppBar from '../components/AppBar';

export default function Home() {
  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hello, World
        </Typography>
      </Box>
      <StickyFooter />
    </Container>
  );
}