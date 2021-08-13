import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_QUALIFICATIONS } from '../utils/queries';
import { Grid } from '@material-ui/core';
import CustomCheckbox from '../components/formComponents/CustomCheckbox';
import { titleCase } from "title-case";


function QualificationsChecklist() {

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
        
        return (
            <Grid item xs={12}>
                {qualifications.map((qualification) => (
                <Grid item xs={12}>
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