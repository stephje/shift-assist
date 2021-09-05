import React from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { GET_VOLUNTEERS } from '../utils/queries';
import VolunteerEntry from '../components/adminComponents/VolunteerEntry';

function VolunteerList() {
    // Styling for volunteer list
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        flex: {
            display: 'flex',
            flexDirection: 'column',
        },
        item: {
            padding: 0,
            paddingLeft: 8,
        },
        bold: {
            fontsize: 10,
            fontWeight: 600,
        },
    }));

    // Use styling defined above
    const classes = useStyles();

    // Query to get all volunteers from DB
    const { loading, error, data } = useQuery(GET_VOLUNTEERS);
    if (loading) {
        return (
            <Box display='flex' justifyContent='center' p={10}>
                <CircularProgress />
            </Box>
        );
    }
    if (error) {
        console.error(error.message);
    }
    if (!data.getVolunteers) {
        console.log('Not Found');
    } else if (data.getVolunteers) {
        const volunteers = data.getVolunteers;

        // Map the volunteer into the accordion component
        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    {volunteers.map(volunteer => {
                        return (
                            <VolunteerEntry
                                volunteer={volunteer}
                                key={volunteer._id}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        );
    }
}

export default VolunteerList;
