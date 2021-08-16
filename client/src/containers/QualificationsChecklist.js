import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_QUALIFICATIONS } from '../utils/queries';
import { Grid } from '@material-ui/core';
import CustomCheckbox from '../components/formComponents/CustomCheckbox';
import { titleCase } from "title-case";


function QualificationsChecklist() {

    // Query DB for list of qualifications
    const { loading, error, data } = useQuery(GET_QUALIFICATIONS);
    if (loading) {
        return "Loading";
    }
    if (error) {
        console.error(error.message);
    } if (!data.getQualifications) {
        console.log("Not Found");
    } else if (data.getQualifications) {
        const qualifications = data.getQualifications;
        // Return grid component
        // Map qualifications data onto properties custom checkbox component
        return (
            <Grid item xs={12}>
                {qualifications.map((qualification) => (
                <Grid item xs={12} key={qualification._id}>
                    <CustomCheckbox 
                    key={qualification._id}
                    name={qualification.name}
                    label={titleCase(qualification.label)}/>
                </Grid>
                    ))}
            </Grid>
        );
    };
};

export default QualificationsChecklist;