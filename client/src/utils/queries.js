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
            _id
            firstName
            lastName
            email
            mobile
            address
            suburb
            postcode
            state
            previousExperience
            medical
            emergencyContactRelationship
            emergencyContactName
            emergencyContactPhone
            commsPermissions
            termsAndConditions
            nominatedRoles {
                _id
                name
                label
                qualifications {
                    _id
                    name
                    label
                }
            }
            qualificationsHeld {
                _id
                name
                label
            }
            availability {
                _id
                name
                label
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
