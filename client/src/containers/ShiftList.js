import React from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_SHIFTS } from '../utils/queries';
import ShiftEntry from '../components/adminComponents/ShiftEntry';
import { makeStyles } from '@material-ui/core/styles';

function ShiftList() {
    // Styling for ShiftList
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

    // Query DB for all shifts
    const { loading, error, data } = useQuery(GET_SHIFTS);

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
    if (!data.getShifts) {
        console.log('Not Found');
    } else if (data.getShifts) {
        const shifts = data.getShifts;

        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    {/* <Button>SORT BY</Button> */}

                    {shifts.map(shift => {
                        return <ShiftEntry shift={shift} key={shift._id} />;
                    })}
                </Grid>
            </Grid>
        );
    }
}

export default ShiftList;
