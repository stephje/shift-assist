const faker = require("faker/locale/en_AU");

function getVolunteerSeeds() {

    faker.locale = 'en_AU';
    const volunteerArray = [];
    const timeslots = ['morning', 'afternoon', 'evening'];
    const qualifications = ['rsa', 'mlp', 'sfa', 'ptd'];
    const roles = [
        'barAttendant',
        'barManager',
        'shuttleBusDriver',
        'firstAidAttendant',
        'ticketOfficeAttendant',
        'merchAttendant',
        'wasteCrewMember',
    ];
    const medicalConditions = [
        'Asthma, cannot run long distances or perform extreme aerobic activities', 
        'Minor injury, cannot raise right arm high above head',
        '', '','', '','', '','', '','', '','', '','', '','', '','', '','', '','', '','', '','', '','', '','', ''
    ];

    for (let i = 0; i < 30; i++) {
        let volunteer = {};
        volunteer.firstName = faker.name.firstName();
        volunteer.lastName = faker.name.lastName();
        volunteer.email = faker.internet.email();
        volunteer.mobile = faker.phone.phoneNumber('04########');
        volunteer.address = faker.address.streetAddress();
        volunteer.suburb = faker.address.city();
        volunteer.state = faker.address.stateAbbr();
        volunteer.postcode = faker.address.zipCode();
        volunteer.previousExperience = faker.datatype.boolean();
        volunteer.medical = faker.random.arrayElement(medicalConditions);
        volunteer.emergencyContactName = faker.name.findName();
        volunteer.emergencyContactRelationship = faker.random.arrayElement(["Parent", "Sibling", "Partner", "Friend"]);
        volunteer.emergencyContactPhone = faker.phone.phoneNumber('04########');
        volunteer.commsPermissions = true;
        volunteer.termsAndConditions = true;
        volunteer.nominatedRoles = faker.random.arrayElements(roles);
        volunteer.qualificationsHeld = faker.random.arrayElements(qualifications);
        volunteer.availability = faker.random.arrayElements(timeslots);
        volunteer.assignedShifts = [];

        volunteerArray.push(volunteer);
    }

    return volunteerArray;

}

module.exports = getVolunteerSeeds;