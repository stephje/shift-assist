const Volunteer = require ('./models/Volunteer')

module.exports = {

    Query: {

      volunteers: async () => {
        return await Volunteer.find().sort({ lastName: 1 });
      }

    },

    Mutation: {
      addVolunteer: async (parent, args, context, info) => {
        const {firstName, lastName, email} = args.volunteer;
        return Volunteer.create({firstName, lastName, email});
      }
    }
    
  };