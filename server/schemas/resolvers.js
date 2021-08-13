const { Volunteer, Role, Qualification, Timeslot } = require('../models');

async function getObjectIds(arrayOfElements, collection) {
    let newArray = [];
    for (const element of arrayOfElements) {
        const document = await collection.findOne({name: element});
        const documentId = document._id;
        newArray.push(documentId);
    }
    return newArray;
}

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
        addVolunteer: async (_, {volunteer}) => {

            console.log(volunteer)
            
            volunteer.qualificationsHeld = await getObjectIds(volunteer.qualificationsHeld, Qualification);

            volunteer.availability = await getObjectIds(volunteer.availability, Timeslot);

            volunteer.nominatedRoles = await getObjectIds(volunteer.nominatedRoles, Role);

            console.log("Volunter", volunteer)

            return Volunteer.create(volunteer);
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
        addRole: async (_, { name, label, qualifications }) => {
            return Role.create({ name, label, qualifications });
        },
        addQualification: async (_, {name}) => {
            return Qualification.create({ name });
        },
    },
};
