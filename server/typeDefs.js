const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # "Volunteer" type defines queryable fields for volunteers.
  type Volunteer {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    emailConfirmation: String!
    address: String
    suburb: String
    postCode: String
    state: String
    mobile: String
    previousExperience: String
    age: Int!
    medical: String
    emergencyContactName: String! 
    emergencyContactPhone: Int!
    emergencyContactRelationship: String!
    acceptedCommsPermissions: Boolean!
    acceptedTermsAndConditions: Boolean!

  }

  type Qualification {
    _id: ID
    name: String!
  }

  type Role {
    _id: ID
    name: String!
    label: String!
    qualifications: [Qualification]
  }

  input VolunteerInput {
    firstName: String!
    lastName: String!
    email: String!
    emailConfirmation: String!
    address: String
    suburb: String
    postCode: String
    state: String
    mobile: String
    previousExperience: String
    age: Int!
    medical: String
    emergencyContactName: String! 
    emergencyContactPhone: Int!
    emergencyContactRelationship: String!
    acceptedCommsPermissions: Boolean!
    acceptedTermsAndConditions: Boolean!
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

  # Queries that can be executed
  type Query {
    getVolunteers: [Volunteer]!
    volunteer(volunteerId: ID!): Volunteer
    getRoles: [Role]!
    getQualifications: [Qualification]!
  }

  type Mutation {
    addVolunteer(volunteer: VolunteerInput): Volunteer
    removeVolunteer(volunteerId: ID!): Volunteer
    updateVolunteer(volunteerId: ID!, volunteer: VolunteerInput): Volunteer
    addRole(role: RoleInput): Role
    addQualification(qualification: QualificationInput): Qualification
  }

`;

module.exports = typeDefs;