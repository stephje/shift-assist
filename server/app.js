const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

dotenv.config();

async function startApolloServer() {
    const typeDefs = require('./typeDefs');
    const resolvers = require('./resolvers');

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();
    server.applyMiddleware({ app });

    app.use('/', (req, res) => {
        res.send('Hello from the other siiiiide~');
    });

    const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sahe7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

    await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    });
    console.log("MongoDB Connected");

    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
}

startApolloServer();

