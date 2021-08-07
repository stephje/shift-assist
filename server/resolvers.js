const Volunteer = require('./models/Volunteer');

module.exports = {
    Query: {
        volunteers: async () => {
            return await Volunteer.find().sort({ lastName: 1 });
        },

        volunteer: async (_, { volunteerId }) => {
            return await Volunteer.findById({ _id: volunteerId });
        },
    },

    Mutation: {
        addVolunteer: async (_, args) => {
            const { firstName, lastName, email } = args.volunteer;
            return Volunteer.create({ firstName, lastName, email });
        },
        removeVolunteer: async (_, { volunteerId }) => {
            return await Volunteer.findByIdAndDelete(volunteerId);
        },
        updateVolunteer: async (_, args) => {
            const { volunteerId } = args;
            const { firstName, lastName, email } = args.volunteer;
            return await Volunteer.findByIdAndUpdate(
                volunteerId,
                { firstName, lastName, email },
                { new: true }
            );
        },
    },
};
