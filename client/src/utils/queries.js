import { gql } from "@apollo/client";

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

export const GET_SHIFTS = gql`
  query getShifts {
    getShifts {
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
          startTime
          endTime
        }
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

export const GET_VOLUNTEER_REGISTRATION = gql`
  query getVolunteerRegistration($userId: ID!) {
    getVolunteerRegistration(userId: $userId) {
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
      assignedShifts {
        _id
        name
        label
        timeslots {
          _id
          name
          label
          startTime
          endTime
        }
        roles {
          name
          _id
          label
          qualifications {
            _id
            name
            label
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_VOLUNTEER_DATA = gql`
  query getCurrentVolunteerData {
    getCurrentVolunteerData {
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
        startTime
        endTime
      }
      assignedShifts {
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
      }
    }
  }
`;

export const GET_VOLUNTEER_ID_BY_USER_ID = gql`
  query getVolunteerIdByUserId($userId: ID!) {
    getVolunteerRegistration(userId: $userId) {
      _id
      userId
    }
  }
`;
