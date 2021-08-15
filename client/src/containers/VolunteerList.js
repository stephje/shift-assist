import React from 'react';
import { Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_VOLUNTEERS } from '../utils/queries';

function VolunteerList() {

    const { loading, error, data } = useQuery(GET_VOLUNTEERS);
    if (loading) {
        return "Loading";
    }
    if (error) {
        console.error(error.message);
    } if (!data.getVolunteers) {
        console.log("Not Found");
    } else if (data.getVolunteers) {
        const volunteers = data.getVolunteers;

    return (
        <Grid container>
            {volunteers.map((volunteer) => (
                <Grid item xs={12} key={volunteer._id}>
                    {volunteer.firstName}
                </Grid>
            ))}
        </Grid>
    )};
}

export default VolunteerList;