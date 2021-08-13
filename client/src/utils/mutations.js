import { gql } from '@apollo/client';

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