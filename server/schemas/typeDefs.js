const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    admin: Boolean!
  }
  type Auth {
    token: ID!
    user: User
    admin: Boolean
  }
  
  # "Volunteer" type defines queryable fields for volunteers.
  type Volunteer {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    mobile: String!
    address: String
    suburb: String
    state: String
    postcode: String!
    previousExperience: String!
    medical: String
    emergencyContactName: String! 
    emergencyContactRelationship: String!
    emergencyContactPhone: String!
    commsPermissions: Boolean!
    termsAndConditions: Boolean!
    nominatedRoles: [Role]
    qualificationsHeld: [Qualification]
    availability: [Timeslot]
  }

  input VolunteerInput {
    firstName: String!
    lastName: String!
    email: String!
    mobile: String!
    address: String
    suburb: String
    state: String
    postcode: String!
    previousExperience: String!
    medical: String
    emergencyContactName: String! 
    emergencyContactRelationship: String!
    emergencyContactPhone: String!
    commsPermissions: Boolean!
    termsAndConditions: Boolean!
    nominatedRoles: [String]
    qualificationsHeld: [String]
    availability: [String]
  }

  type Qualification {
    _id: ID
    name: String!
    label: String!
  }

  input QualificationInput {
    name: String
    label: String
  }

  type Role {
    _id: ID
    name: String!
    label: String!
    qualifications: [Qualification]
  }

  input RoleInput {
    name: String
    label: String
    qualifications: [QualificationInput]
  }

  type Shift {
    _id: ID
    name: String!
    label: String!
    timeslots: [Timeslot]
    roles: [Role]
  }

  input ShiftInput {
    name: String
    label: String
    timeslots: [TimeslotInput]
    roles: [RoleInput]
  }

  type Timeslot {
    _id: ID
    name: String!
    label: String!
    startTime: String!
    endTime: String!
  }

  input TimeslotInput {
    name: String
    label: String
    startTime: String
    endTime: String
  }
 
  type Location {
    _id: ID
    name: String!
    label: String!
  }

  input LocationInput {
    name: String
    label: String
  }

  # Queries that can be executed
  type Query {
    users: [User]
    user(username: String!): User
    me: User

    volunteer(volunteerId: ID!): Volunteer

    getVolunteers: [Volunteer]!
    getShifts: [Shift]!

    getRoles: [Role]!
    getQualifications: [Qualification]!
    getTimeslots: [Timeslot]!
    getLocations: [Location]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, admin: Boolean!): Auth
    login(email: String!, password: String!): Auth

    addVolunteer(volunteer: VolunteerInput): Volunteer
    removeVolunteer(volunteerId: ID!): Volunteer
    updateVolunteer(volunteerId: ID!, volunteer: VolunteerInput): Volunteer

    
    removeShift(shiftId: ID!): Shift
    updateShift(ShiftId: ID!, shift: ShiftInput): Shift

    addRole(role: RoleInput): Role
    addShift(shift: ShiftInput): Shift
    addQualification(qualification: QualificationInput): Qualification
    addTimeslot(timeslot: TimeslotInput): Timeslot
    addLocation(location: LocationInput): Location
  }

`;

module.exports = typeDefs;
