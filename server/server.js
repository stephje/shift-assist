const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');

dotenv.config();

async function startApolloServer() {
    const typeDefs = require('./typeDefs');
    const resolvers = require('./resolvers');

    const PORT = process.env.PORT || 4000;
    const app = express();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    server.applyMiddleware({ app });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
      }
      
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    app.use('/', (req, res) => {
        res.send('Hello from the other siiiiide~');
    });

    await mongoose.connect(
        process.env.MONGODB_URI || 'mongodb://localhost/shiftassistDB',
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    );
    console.log('MongoDB Connected');

    await new Promise(resolve => app.listen({ port: PORT }, resolve));
    console.log(
        `Server listening on port ${PORT}, graphql at http://localhost:${PORT}${server.graphqlPath}`
    );
    return { server, app };
}

startApolloServer();
