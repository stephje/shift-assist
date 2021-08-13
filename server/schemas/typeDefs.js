const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    postCode: String!
    previousExperience: String!
    age: Int!
    medical: String
    emergencyContactName: String! 
    emergencyContactRelationship: String!
    emergencyContactPhone: String!
    commsPermissions: Boolean!
    termsAndConditions: Boolean!
    nominatedRoles: [Role]
    qualificationsHeld: [Qualification]
  }

  type Qualification {
    _id: ID
    name: String!
    label: String!
  }

  type Role {
    _id: ID
    name: String!
    label: String!
    qualifications: [Qualification]
  }

  type Shift {
    _id: ID
    date: String!
    time: String!
    role: Role!
    timeslot: Timeslot!
  }

  type Timeslot {
    _id: ID
    name: String!
    label: String!
  }

  input VolunteerInput {
    firstName: String!
    lastName: String!
    email: String!
    mobile: String!
    address: String
    suburb: String
    state: String
    postCode: String!
    previousExperience: String!
    age: Int!
    medical: String
    emergencyContactName: String! 
    emergencyContactRelationship: String!
    emergencyContactPhone: String!
    commsPermissions: Boolean!
    termsAndConditions: Boolean!
    nominatedRoles: [RoleInput]
    qualificationsHeld: [QualificationInput]
  }

  input RoleInput {
    name: String!
    label: String!
    qualifications: [QualificationInput]
  }

  input QualificationInput {
    name: String!
    label: String!
  }

  input ShiftInput {
    date: String!
    time: String! 
    role: RoleInput!
    timeslot: TimeslotInput!
  }

  input TimeslotInput {
    name: String!
    label: String!
  }

  # Queries that can be executed
  type Query {
    getVolunteers: [Volunteer]!
    volunteer(volunteerId: ID!): Volunteer
    getRoles: [Role]!
    getQualifications: [Qualification]!
    getTimeslots: [Timeslot]!
  }

  type Mutation {
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