import { gql } from '@apollo/client';

export const ADD_VOLUNTEER = gql`
    mutation addVolunteer($volunteerDetails: VolunteerInput!) {
        addVolunteer(volunteer: $volunteerDetails) {
            firstName, 
            lastName, 
            email,
            emailConfirmation,
            address,
            suburb,
            postCode,
            state,
            mobile,
            previousExperience,
            age,
            medical,
            emergencyContactName,
            emergencyContactPhone,
            emergencyContactRelationship,
            acceptedCommsPermissions,
            acceptedTermsAndConditions
        }
    }
`;