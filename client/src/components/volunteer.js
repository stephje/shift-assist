import React from 'react';
import { useQuery } from '@apollo/client';
import { ADD_VOLUNTEER } from '../utils/queries';

const Volunteer = (props) => {
    return(
        <div classname="card">
            <h2>{props.name}</h2>
            <h4>{props.email}</h4>
            <h4>{props.mobile}</h4>
        </div>
    )
}

export default Volunteer;