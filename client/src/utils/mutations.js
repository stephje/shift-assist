import { gql } from "@apollo/client";

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
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $admin: Boolean!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      admin: $admin
    ) {
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

export const REMOVE_SHIFT = gql`
  mutation removeShift($removeShiftShiftId: ID!) {
    removeShift(shiftId: $removeShiftShiftId) {
      _id
      name
      label
    }
  }
`;

export const ASSIGN_VOLUNTEER_TO_SHIFT = gql`
  mutation assignVolunteerToShift($shiftId: ID!, $volunteerId: ID!) {
    assignVolunteerToShift(shiftId: $shiftId, volunteerId: $volunteerId) {
      _id
      name
      label
      timeslot {
        _id
        name
        label
        startTime
        endTime
      }
      role {
        _id
        name
        label
        qualifications {
          _id
          name
          label
        }
      }
      location
      assignedVolunteer {
        _id
        userId
        firstName
        lastName
        email
        mobile
        address
        suburb
        state
        postcode
        previousExperience
        medical
        emergencyContactName
        emergencyContactRelationship
        emergencyContactPhone
        qualificationsHeld {
          _id
          name
          label
        }
        availability {
          _id
          name
          label
          startTime
          endTime
        }
      }
    }
  }
`;

export const REMOVE_VOLUNTEER_FROM_SHIFT = gql`
mutation removeVolunteerFromShift($shiftId: ID!, $volunteerId: ID!) {
  removeVolunteerFromShift(shiftId: $shiftId, volunteerId: $volunteerId) {
    _id
    name
    label
    timeslot {
      _id
      name
      label
      startTime
      endTime
    }
    role {
      _id
      name
      label
      qualifications {
        _id
        name
        label
      }
    }
    location
    assignedVolunteer {
      _id
    }
  }
}
`;