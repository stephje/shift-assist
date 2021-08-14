const { User, Volunteer, Role, Qualification, Timeslot } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
        users: async () => {
            return User.find();
          },
        user: async (parent, { username }) => {
        return User.findOne({ username });
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('Please make sure you have logged in!');
          },

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
        addUser: async (parent, { username, email, password, admin }) => {
            const user = await User.create({ username, email, password, admin });
            const token = signToken(user);
            console.log(user);
            return { token, user };
          },
        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
    
        if (!user) {
            throw new AuthenticationError('No user found with this email address');
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }
    
        const token = signToken(user);
    
        return { token, user };
        },
        addVolunteer: async (_, {volunteer}) => {
            //Replace name values in arrays with ObjectIds and create new volunteer document
            volunteer.qualificationsHeld = await getObjectIds(volunteer.qualificationsHeld, Qualification);

            volunteer.availability = await getObjectIds(volunteer.availability, Timeslot);

            volunteer.nominatedRoles = await getObjectIds(volunteer.nominatedRoles, Role);

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
