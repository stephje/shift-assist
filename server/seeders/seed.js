const dotenv = require('dotenv');
dotenv.config();
const db = require('../config/connection');
const { Volunteer, Qualification, Role, Timeslot } = require ('../models');
const qualificationSeeds = require('./qualificationSeeds.json');
const timeslotSeeds = require('./timeslotSeeds.json');
const roleSeeds = require('./roleSeeds.json');
const getVolunteerSeeds = require('./getVolunteerSeeds');
const getUnqualifiedVolunteerSeeds = require('./getUnqualifiedVolunteerSeeds');

// Function that converts arrays of values to arrays of ObjectIds
async function getObjectIds(arrayOfElements, collection, lookup) {
  let newArray = [];
  for (const element of arrayOfElements) {
      const document = await collection.findOne({[lookup]: element});
      const documentId = document._id;
      newArray.push(documentId);
  }
  return newArray;
}

db.once('open', async () => {
    try {
      // Delete existing qualification documents and seed database from json file
      await Qualification.deleteMany({});
      await Qualification.create(qualificationSeeds);

      // Delete existing timeslot documents and seed database from json file
      await Timeslot.deleteMany({});
      await Timeslot.create(timeslotSeeds);

      // Delete existing role documents and seed database from json file
      await Role.deleteMany({});
      for (const role of roleSeeds) {
        if(role.qualifications) {
          role.qualifications = await getObjectIds(role.qualifications, Qualification, 'name');
          await Role.create(role);
        } else if (!role.qualifications) {
          await Role.create(role);
        }
      }

      //delete all existing volunteer documents, then seed the database with fresh data generated by the faker NPM package
      await Volunteer.deleteMany({});
      const volunteerSeeds = getVolunteerSeeds();

      for (const volunteer of volunteerSeeds) {
        if(volunteer.nominatedRoles) {
          volunteer.nominatedRoles = await getObjectIds(volunteer.nominatedRoles, Role, 'name');
        }
        
        if (volunteer.qualificationsHeld) {
          volunteer.qualificationsHeld = await getObjectIds(volunteer.qualificationsHeld, Qualification, 'name');
        }

        if (volunteer.availability) {
          volunteer.availability = await getObjectIds(volunteer.availability, Timeslot, 'name');
        }

        await Volunteer.create(volunteer);
      }

      const unqualifiedVolunteerSeeds = getUnqualifiedVolunteerSeeds();
      
      for (const volunteer of unqualifiedVolunteerSeeds) {
        if(volunteer.nominatedRoles) {
          volunteer.nominatedRoles = await getObjectIds(volunteer.nominatedRoles, Role, 'name');
        }

        if (volunteer.availability) {
          volunteer.availability = await getObjectIds(volunteer.availability, Timeslot, 'name');
        }

        await Volunteer.create(volunteer);
      }
  
      console.log('Database Seeded');
      process.exit(0);
    } catch (err) {
      throw err;
    }
  });
  