import { gql } from '@apollo/client';

export const GET_VOLUNTEERS = gql`
    query getVolunteers {
        getVolunteers {
            volunteer {
            _id
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
    }
`;

export const GET_ROLES = gql`
    query getRoles {
        getRoles {
            _id
            name
            label
            qualifications {
                _id
            }
        }
    }
`;

export const GET_QUALIFICATIONS = gql`
    query getQualifications {
        getQualifications {
            _id
            name
            label
        }
    }
`;

export const GET_TIMESLOTS = gql`
    query getTimeslots {
        getTimeslots {
            _id
            name
            label
        }
    }
`;
