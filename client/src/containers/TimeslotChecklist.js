import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TIMESLOTS } from '../utils/queries';
import { Grid } from '@material-ui/core';
import CustomCheckbox from '../components/formComponents/CustomCheckbox';
import { titleCase } from "title-case";


function TimeslotChecklist() {

    const { loading, error, data } = useQuery(GET_TIMESLOTS);
    if (loading) {
        return "Loading";
    }
    if (error) {
        console.error(error.message);
    } if (!data.getTimeslots) {
        console.log("Not Found");
    } else if (data.getTimeslots) {
        const timeslots = data.getTimeslots;
        
        return (
            <Grid item xs={12}>
                {timeslots.map((timeslot) => (
                <Grid item xs={12} key={timeslot._id}>
                    <CustomCheckbox 
                    key={timeslot._id}
                    name={timeslot.name}
                    label={titleCase(timeslot.label)}/>
                </Grid>
                    ))}
            </Grid>
        );
    };
};

export default TimeslotChecklist;