const dotenv = require('dotenv');
dotenv.config();

const db = require('../config/connection');

const { Qualification, Role, Timeslot } = require ('../models')
const qualificationSeeds = require('./qualificationSeeds.json')

const timeslotSeeds = require('./timeslotSeeds.json')
const roleSeeds = require('./roleSeeds.json')

const qualificationsCollection = db.collection("qualifications");

db.once('open', async () => {
    try {
      await Qualification.deleteMany({});
      await Qualification.create(qualificationSeeds);
      await Timeslot.deleteMany({});
      await Timeslot.create(timeslotSeeds);
      await Role.deleteMany({});

      for (const role of roleSeeds) {
        if(role.qualifications) {
          qualificationsArray = role.qualifications;
          let newQualificationsArray = [];

          for (const qualification of qualificationsArray) {
            const qualificationObject = await qualificationsCollection.findOne({name: qualification});
            const qualificationId = qualificationObject._id
            newQualificationsArray.push(qualificationId);
          }
          role.qualifications = newQualificationsArray;
          await Role.create(role);
        } else if (!role.qualifications) {
          await Role.create(role);
        }

      }
  
      console.log('Database Seeded');
      process.exit(0);
    } catch (err) {
      throw err;
    }
  });
  