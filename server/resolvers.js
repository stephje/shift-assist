const Volunteer = require('./models/Volunteer');
const Role = require('./models/Role');
const Qualification = require('./models/Qualification')

module.exports = {
    Query: {
        volunteers: async () => {
            return await Volunteer.find().sort({ lastName: 1 });
        },

        volunteer: async (_, { volunteerId }) => {
            return await Volunteer.findById({ _id: volunteerId });
        },

        getRoles: async () => {
            return await Role.find().sort({ name: 1 });
        },

        getQualifications: async () => {
            return await Qualification.find().sort({ name: 1 });
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
        addRole: async (_, args) => {
            const { name, qualifications } = args.role;
            return Role.create({ name, qualifications });
        },
        addQualification: async (_, args) => {
            const { name } = args.qualification;
            return Qualification.create({ name });
        },
    },
};
