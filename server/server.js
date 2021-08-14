require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

async function startApolloServer() {

    const PORT = process.env.PORT || 4000
    const app = express();

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        context: authMiddleware });

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

    await mongoose.connect(
        process.env.MONGODB_URI,
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
