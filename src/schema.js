const { gql } = require('apollo-server');

// graphql-codegen

const typeDefs = gql`
  type Query {
    randomReleases: SearchResult!
    searchReleases(
      query: String
      genre: String
      style: String
      country: String
      years: [String]
      artist: String
    ): [SearchResult]
    releaseDetails(id: ID): ReleaseDetails
    artistDetails(id: ID): ArtistDetails
  }
  type SearchResult {
    page: Int
    pages: Int
    items: Int
    results: [Release!]!
  }
  type Release {
    title: String
    styles: [String!]!
    genres: [String!]!
    country: String
    year: Int
    url: String
    image: Image
    id: ID!
    """
    Watch out for performance bottleneck
    -> additional API request
    """
    details: ReleaseDetails!
  }
  type ReleaseDetails {
    title: String
    artists: [Artist!]!
    styles: [String!]!
    genres: [String!]!
    images: [Image!]!
    country: String
    released: Int
    tracklist: [Track!]!
    videos: [String!]!
    id: ID!
  }
  type Artist {
    name: String!
    id: ID!
    # """
    # Watch out for performance bottleneck
    # -> additional API request
    # """
    details: ArtistDetails!
  }
  type ArtistDetails {
    name: String
    realname: String
    profile: String
    url: String
    images: [Image!]!
    id: ID!
  }
  type Image {
    type: String
    small: String
    full: String
  }
  type Track {
    duration: String
    position: String
    title: String
  }
`;

module.exports = typeDefs;
