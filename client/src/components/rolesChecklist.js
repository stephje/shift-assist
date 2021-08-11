import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ROLES } from '../utils/queries';
import { Box, Checkbox } from '@material-ui/core';

function RolesChecklist() {

    const { loading, error, data } = useQuery(GET_ROLES);
    if (loading) {
        return "Loading";
    }
    if (error) {
        console.error(error.message)
    } if (!data.getRoles) {
        console.log("Not Found")
    } else if (data.getRoles) {
        const roles = data.getRoles;
        return (
            <Box my={2}>
                {
                    roles.map((role) => (
                        <Checkbox
                            key={role._id} name={role.label} value={role.label} label={role.label}
                            inputProps={{ 'aria-label': 'Checkbox A' }}
                        />
                    ))}
                {/* {
                    roles.map((role) => (
                    <div key={role._id}>
                        <input type="checkbox" id={role.label} name={role.label} value={role.label}/>
                        <label htmlFor={role.label}>{role.name}</label> 
                    </div>
                ))} */}
            </Box>
        )
    }



}

export default RolesChecklist;


{/* <TextField
fullWidth
id='medical'
name='medical'
label=' '
value={formik.values.medical}
onChange={formik.handleChange}
error={formik.touched.medical && Boolean(formik.errors.medical)}
helperText={formik.touched.medical && formik.errors.medical}
/> */}

{/* <RadioGroup name='previousExperience' onChange={formik.handleChange}>
<FormControlLabel value={experienceOptions.Option1.toString()} control={<Radio />} label="Yes" />
<FormControlLabel value={experienceOptions.Option2.toString()} control={<Radio />} label="No" />
</RadioGroup> */}