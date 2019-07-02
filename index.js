require('dotenv').config();
const cors = require('micro-cors')();

const { ApolloServer } = require('apollo-server-micro');
const Discogs = require('disconnect');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const DiscogsAPI = require('./datasources/discogs');

const discogsClient = new Discogs.Client({
  consumerKey: process.env.DISCOGS_CONSUMER_KEY,
  consumerSecret: process.env.DISCOGS_CONSUMER_SECRET
}).database();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ discogsAPI: new DiscogsAPI(discogsClient) }),
  engine: { apiKey: process.env.ENGINE_API_KEY }
});

module.exports = cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  return apolloServer.createHandler()(req, res);
});
