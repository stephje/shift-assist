const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # "Volunteer" type defines queryable fields for volunteers.
  type Volunteer {
    _id: ID
    firstName: String!
    lastName: String!
    address: String
    suburb: String
    postCode: Int!
    state: String
    mobilePhone: Int!
    email: String!
    experience: Boolean!
    age: Int!
    medical: String
    emergencyContact: String! 
    emergencyContactPhone: Int!
    emergencyContactRelationship: String!
    acceptedCommsPermissions: Boolean!
    acceptedTermsAndConditions: Boolean!

    hasRSA: Boolean
    hasMLP: Boolean
    hasSeniorFirstAid: Boolean
    hasWWC: Boolean
    hasPTDLicense: Boolean
    hasETCLicense: Boolean
    hasTelehandlerLicense: Boolean

    roleBarAttendant: Boolean
    roleBarManager: Boolean
    roleMarshall: Boolean
    roleFirstAidStation: Boolean
    roleBusDriver: Boolean
    roleShopAttendant: Boolean
    roleTicketOffice: Boolean
    roleArtistCheckIn: Boolean
    roleVolunteerCheckIn: Boolean
    roleSetup: Boolean
    rolePackdown: Boolean
    roleRunner: Boolean
    roleVenueMC: Boolean
    roleChildArea: Boolean
    roleTrafficWarden: Boolean 
  }

  # Queries that can be executed
  type Query {
    volunteers: [Volunteer]!
    volunteer(volunteerId: ID!): Volunteer
  }

  input VolunteerInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  type Mutation {
    addVolunteer(volunteer: VolunteerInput): Volunteer
    removeVolunteer(volunteerId: ID!): Volunteer
    updateVolunteer(volunteerId: ID!, volunteer: VolunteerInput): Volunteer
  }
`;

module.exports = typeDefs;