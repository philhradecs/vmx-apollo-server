require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const DiscogsAPI = require('./datasources/discogs');
const Discogs = require('disconnect').Client;

const discogsClient = new Discogs({
  consumerKey: process.env.DISCOGS_CONSUMER_KEY,
  consumerSecret: process.env.DISCOGS_CONSUMER_SECRET
}).database();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ discogsAPI: new DiscogsAPI(discogsClient) }),
  cors: true
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
