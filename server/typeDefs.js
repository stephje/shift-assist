const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # "Volunteer" type defines queryable fields for volunteers.
  type Volunteer {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
  }

  type Qualification {
    name: String!
  }

  type Role {
    _id: ID
    name: String!
    qualifications: [Qualification]
  }

  input VolunteerInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  # Queries that can be executed
  type Query {
    volunteers: [Volunteer]!
    volunteer(volunteerId: ID!): Volunteer

    getRoles: [Role]
    getQualifications: [Qualification]!
  }

  type Mutation {
    addVolunteer(volunteer: VolunteerInput): Volunteer
    removeVolunteer(volunteerId: ID!): Volunteer
    updateVolunteer(volunteerId: ID!, volunteer: VolunteerInput): Volunteer
  }

`;

module.exports = typeDefs;