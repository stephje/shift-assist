const dotenv = require('dotenv');
dotenv.config();

const db = require('../config/connection');
const { Qualification, Role } = require ('../models')
const qualificationSeeds = require('./qualificationSeeds.json')
const roleSeeds = require('./roleSeeds.json')

const qualificationsCollection = db.collection("qualifications");

db.once('open', async () => {
    try {
      await Qualification.deleteMany({});
      await Qualification.create(qualificationSeeds);
      await Role.deleteMany({});

      for (const role of roleSeeds) {
        qualificationsArray = role.qualifications;

        let newQualificationsArray = [];

        for (const qualification of qualificationsArray) {
          const qualificationObject = await qualificationsCollection.findOne({name: qualification});
          const qualificationId = qualificationObject._id
          newQualificationsArray.push(qualificationId);
        }
        role.qualifications = newQualificationsArray;
        await Role.create(role);
      }
  
      console.log('Database Seeded');
      process.exit(0);
    } catch (err) {
      throw err;
    }
  });
  