const { Volunteer, Role, Qualification, Timeslot } = require('../models');

module.exports = {
    Query: {
        getVolunteers: async () => {
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
        getTimeslots: async () => {
            return await Timeslot.find().sort({label: 1});
        },
    },

    Mutation: {
        addVolunteer: async (_, args) => {
            const { 
                firstName, 
                lastName, 
                email,
                address,
                suburb,
                state,
                postCode,
                mobile,
                previousExperience,
                age,
                medical,
                emergencyContactName,
                emergencyContactRelationship,
                emergencyContactPhone,
                commsPermissions,
                termsAndConditions,
                nominatedRoles,
                qualificationsHeld
            } = args.volunteer;
            return Volunteer.create({ 
                firstName, 
                lastName, 
                email,
                address,
                suburb,
                state,
                postCode,
                mobile,
                previousExperience,
                age,
                medical,
                emergencyContactName,
                emergencyContactRelationship,
                emergencyContactPhone,
                commsPermissions,
                termsAndConditions,
                nominatedRoles,
                qualificationsHeld
            });
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
            const { name, label, qualifications } = args.role;
            return Role.create({ name, label, qualifications });
        },
        addQualification: async (_, args) => {
            const { name } = args.qualification;
            return Qualification.create({ name });
        },
    },
};
