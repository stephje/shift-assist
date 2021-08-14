import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      admin
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      admin
    }
  }
`;

export const GET_VOLUNTEERS = gql`
    query getVolunteers {
        getVolunteers {
            volunteer {
            _id
            firstName, 
            lastName, 
            email,
            mobile,
            address,
            suburb,
            state,
            postCode,
            previousExperience,
            medical,
            emergencyContactName,
            emergencyContactRelationship,
            emergencyContactPhone,
            commsPermissions,
            termsAndConditions,
            nominatedRoles,
            qualificationsHeld,
            availability 
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
