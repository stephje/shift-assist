import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        admin
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $admin: Boolean!) {
    addUser(username: $username, email: $email, password: $password, admin: $admin) {
      token
      user {
        _id
        username
        admin
      }
    }
  }
`;

export const ADD_VOLUNTEER = gql`
mutation addVolunteer($volunteer: VolunteerInput) {
  addVolunteer(volunteer: $volunteer) {
    firstName
    lastName
    email
    mobile
    address
    suburb
    state
    medical
    postcode
    previousExperience
    emergencyContactName
    emergencyContactRelationship
    emergencyContactPhone
    commsPermissions
    termsAndConditions
  }
}
`;