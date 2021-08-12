const mongoose = require('mongoose');

    mongoose.connect(
        process.env.MONGODB_URI || 'mongodb://localhost/shiftassistDB',
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    );

module.exports = mongoose.connection;