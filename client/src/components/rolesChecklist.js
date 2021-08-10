import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ROLES } from '../utils/queries';

function RolesChecklist() {

    const { loading, error, data }=useQuery(GET_ROLES);
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
            <div className="checkbox-form-contents">
                <p className="additional-info">Which of the following Volunteer roles are you willing and able to do? (Select as many as are applicable)</p>
                {
                    roles.map((role) => (
                    <div key={role._id}>
                        <input type="checkbox" id={role.label} name={role.label} value={role.label}/>
                        <label htmlFor={role.label}>{role.name}</label> 
                    </div>
                ))}
            </div>
        )
    }



}

export default RolesChecklist;
