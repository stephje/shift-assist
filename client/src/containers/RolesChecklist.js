import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ROLES } from '../utils/queries';
import { Grid } from '@material-ui/core';
import CustomCheckbox from '../components/formComponents/CustomCheckbox';
import { titleCase } from "title-case";


function RolesChecklist() {

    const { loading, error, data } = useQuery(GET_ROLES);
    if (loading) {
        return "Loading";
    }
    if (error) {
        console.error(error.message);
    } if (!data.getRoles) {
        console.log("Not Found");
    } else if (data.getRoles) {
        const roles = data.getRoles;
        
        return (
            <Grid item xs={12}>
                {roles.map((role) => (
                <Grid item xs={12} key={role._id}>
                    <CustomCheckbox 
                    key={role._id}
                    name={role.name}
                    label={titleCase(role.label)}/>
                </Grid>
                    ))}
            </Grid>
        );
    };
};

export default RolesChecklist;