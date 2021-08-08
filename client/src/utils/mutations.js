import { gql } from '@apollo/client';

export const ADD_VOLUNTEER = gql`
    mutation addVolunteer($volunteerDetails: VolunteerInput!) {
        addVolunteer(volunteer: $volunteerDetails) {
            firstName
            lastName
            email
        }
    }
`;