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
    date: String!
    time: String!
    role: Role!
    timeslot: Timeslot!
  }

  input ShiftInput {
    date: String!
    time: String! 
    role: RoleInput!
    timeslot: TimeslotInput!
  }

  type Timeslot {
    _id: ID
    name: String!
    label: String!
  }

  input TimeslotInput {
    name: String
    label: String
  }

  # Queries that can be executed
  type Query {
    users: [User]
    user(username: String!): User
    me: User

    getVolunteers: [Volunteer]!
    volunteer(volunteerId: ID!): Volunteer
    getRoles: [Role]!
    getQualifications: [Qualification]!
    getTimeslots: [Timeslot]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, admin: Boolean!): Auth
    login(email: String!, password: String!): Auth

    addVolunteer(volunteer: VolunteerInput): Volunteer
    removeVolunteer(volunteerId: ID!): Volunteer
    updateVolunteer(volunteerId: ID!, volunteer: VolunteerInput): Volunteer
    addRole(role: RoleInput): Role
    addQualification(qualification: QualificationInput): Qualification
    addShift(shift: ShiftInput): Shift
    addTimeslot(timeslot: TimeslotInput): Timeslot
  }

`;

module.exports = typeDefs;
